import { MySQL } from "@/src/helper/db";
import { NextRequest, NextResponse } from "next/server";
import { CommonUtility } from "@/src/helper/common";

const commonUtility = new CommonUtility();
const prepareQuery = (params) => {
  let query;

  query = `SELECT SUM(a.answer = q.right_option) AS right_marks, SUM(a.answer != q.right_option) AS wrong_marks,
   SUM(a.answer = "") AS not_answered,
    u.full_name as user_name, u.email as user_email FROM answers AS a 
    INNER JOIN users as u ON u.id = a.user_id 
    INNER JOIN questionries AS q ON q.id = a.question_id 
    INNER JOIN exam_assign as ea ON ea.id = a.exam_assign_id 
    INNER JOIN exams as e ON ea.exam_id = e.id  `;

  let whQuery = "";

  if (params.exam_ids) {
    whQuery += `WHERE e.exam_link IN (${params.exam_ids})`;
  }

  if (params.today) {
    whQuery +=
      (whQuery.length > 0 ? ` AND ` : ` WHERE `) +
      `DATE(e.exam_given_date) = CURDATE();`;
  } else {
    if (params.from_date && params.to_date) {
        whQuery += (whQuery.length > 0 ? ` AND ` : ` WHERE `) +
        ` e.exam_given_date BETWEEN '${commonUtility.genrateMysqlDate(
          params.from_date
        )}' AND '${commonUtility.genrateMysqlDate(params.to_date)}'`;
    }
  }

  query += whQuery + ` GROUP BY a.user_id, a.exam_assign_id`;


  return query;
};

const resultAction = async (req) => {
  try {
    const searchParms = req.nextUrl.searchParams;

    let params = {
      exam_ids: searchParms.get("exam_ids"),
      today: searchParms.get("today"),
      from_date: searchParms.get("from_date"),
      to_date: searchParms.get("to_date"),
    };

    let query = prepareQuery(params);
    let mysql = new MySQL();

    let [rows] = await mysql.executeResults(query);

    return NextResponse.json(
      {
        data: rows,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};

export async function GET(req: NextRequest) {
  return resultAction(req);
}
