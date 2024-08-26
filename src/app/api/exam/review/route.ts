import { MySQL } from "@/src/helper/db";
import { NextRequest, NextResponse } from "next/server";
import { fetchQuestionQuery } from "../../answers/route";

/**
 * Checking the exam validation with exam link id
 * @param exam_link_id  it is specialy genrated for exam. So, no exam id will be exposed
 * @param action providing the action as per suggestion
 * @returns response like exam data or its realted data
 */

const fetchReview = async (param, action = "fetch") => {
  let { exam_link_id, nextQuestion,user_id } = param;
  let question;
  try {
    if (exam_link_id) {
      let query = ` SELECT e.id,e.title, ea.assignee_id as user_id, e.question_ids, ea.status, e.exam_creation_date,
       ea.exam_start_date,ea.exam_start_date, e.questions_count,e.exam_duration, e.active, e.exam_link, ea.exam_status FROM exams as e 
      LEFT JOIN exam_assign as ea ON e.id=ea.exam_id WHERE e.exam_link='${exam_link_id}' 
      AND e.active=1 AND ea.exam_status=0 AND ea.status=1 AND ea.assignee_id=${user_id}`;

     
      let mysql = new MySQL();
      let [rows] = await mysql.executeResult(query);

      if (rows.length === 0) {
        return {
          err: "You have passed the wrong exam_link_id OR Some other error is comming. Please contact to the CISPL support",
          success: false,
        };
      } else {
        if (rows[0].exam_status == 1) {
          return {
            err: "You have already appear in the test. IF you have any query. Please contact to the support",
            success: false,
          };
        }
      }

      if (action === "start") {
        query = `UPDATE exam_assign SET exam_duration='${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}', exam_status=1 WHERE assignee_id='${user_id}' `;

        [rows] = await mysql.executeResult(query);
        if (rows.affectedRows > 0) {
          if (nextQuestion) {
            query = fetchQuestionQuery(param);
            [question] = [rows] = await mysql.executeResult(query);
          }
          return {
            message:
              "Your exam is started now. It can not stop now untill exam duration will be completed",
            nextQuestion: question,
            success: true,
          };
        }
      }
      return {
        data: rows[0],
        success: true,
      };
    } else {
      return {
        err: "You must pass the exam link id",
        success: false,
      };
    }
  } catch (err) {
    return {
      err: err.message,
      success: false,
    };
  }
};
/**
 * When candidate will see the exam page then that time only specialy genrated string will be the key to fetch the data from table
 * @param req Nextrequest pparms through which we can fetch the data
 * @returns Return exam content
 */
export async function GET(req: NextRequest) {
  let searchParms = req.nextUrl.searchParams;
  let exam_link_id = searchParms.get("exam_link_id");
  let user_id = searchParms.get("user_id");
  let returnObj = await fetchReview({exam_link_id, user_id});
  let status = 500;
  if (returnObj.success) {
    status = 200;
  }

  return NextResponse.json(returnObj, {
    status: status,
  });
}

/**
 * Exam table will be updated when user trigger the button to start the exam
 * @param req Requuest params to fetch the data
 * @returns returning response
 */

export async function POST(req: Request) {
  let params = await req.json();

  let returnObj = await fetchReview(params, "start");
  let status = 500;
  if (returnObj.success) {
    status = 200;
  }

  return NextResponse.json(returnObj, {
    status: status,
  });
}
