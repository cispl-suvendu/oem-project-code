import { z } from "zod";
import { ValidParms } from "@/src/helper/validParms";
import { NextResponse } from "next/server";
import { MySQL } from "@/src/helper/db";

type paramObj = {
  exam_ids: number;
  user_ids: number[];
};

const validParms = new ValidParms();
const assignValidation = z.object({
  exam_id: z
    .number({
      required_error: "Exam ID is required",
      invalid_type_error: "Exam ID must be a number",
    }),
  user_ids: z
    .number({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a number",
    })
    .array(),
});

const validationAction = (params, action: string = "add") => {
  const validParms = new ValidParms();
  if (action === "add") {
    return validParms.valid(assignValidation, params);
  } else if (action === "update") {
    // return validParms.valid(examUpdateParmsWithArr, params);
  } else if (action === "delete") {
    // return validParms.valid(examDeleteParams, params);
  }
};

const assignExamQuery = (param) => {
  let { exam_id, user_ids, creator_id } = param;

  let query = `INSERT INTO exam_assign (exam_id, assignee_id, assignor_id) VALUES `;
  let valQuery = ``;
 
    user_ids.forEach((user_id) => {
      valQuery +=
        (valQuery.length > 0 ? ` , ` : ``) +
        `  (${exam_id},${user_id}, ${creator_id})`;
    });
  

  query += valQuery;
  let msg = `Exam Assigned`;
  return {
    query,
    msg,
  };
};

const updateTableforprev = async (params) => {
  const mysql = new MySQL();
  let { exam_ids, user_ids, creator_id } = params;

  user_ids.forEach(async (user_id) => {
    let query = `UPDATE exam_assign SET status = 0 
        WHERE assignee_id = ${user_id} AND id < (SELECT MAX(ID) FROM exam_assign WHERE assignee_id = ${user_id} )`;

    mysql.executeResults(query);
  });
};

const assignExamAction = async (param: paramObj, action: string = "add") => {
  let { err, success } = validationAction(param, action);

  try {
    if (success) {
      let { query, msg } = assignExamQuery(param);
      

      const mysql = new MySQL();
      const [rows] = await mysql.executeResults(query);
      await updateTableforprev(param);
      
      return NextResponse.json(
        { message: `${msg} sucessfully`, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ err, success }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json(
      { err: err.message, success: false },
      { status: 500 }
    );
  }
};

export async function POST(request: Request) {
  let paramData = await request.json();
  return await assignExamAction(paramData, "add");
}

async function PATCH(request: Request) {
  let paramData = await request.json();
  return await assignExamAction(paramData, "update");
}
