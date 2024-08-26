import { z } from "zod";
import { ValidParms } from "@/src/helper/validParms";
import { MySQL } from "@/src/helper/db";
import { NextResponse } from "next/server";

/**
 * Creating validation for PARMS
 */

const questionValidSchema = z.object({
  exam_assign_id: z.number({
    required_error: " Please Provide the exam link id",
    invalid_type_error: " Exam lionk id must be number",
  }),
  question_id: z.number({
    required_error: "Please provide the question id",
    invalid_type_error: "Question is should b number",
  }),
  user_id: z.number({
    required_error: " Please provide the user number",
    invalid_type_error: " User id should be a number",
  }),
});

/**
 * Validating PARMS
 * @param params it is as object
 * @param action type of activity
 * @returns
 */

const validateParams = (params, action = "fetch") => {
  let validparams = new ValidParms();
  if (action === "fetch") {
    return validparams.valid(questionValidSchema, params);
  }

  return {
    success: false,
    err: "Something is wrong",
  };
};

/**
 * genrating query for Fetching question
 * @param params parmeter for fetching query
 * @returns returning query
 */

export const fetchQuestionQuery = (params) => {
  let { exam_assign_id, question_id, user_id, nextQuestion } = params;

  /**let query = `SELECT q.id as question_id, q.question AS q_title, q.options AS q_option, 
    a.answer AS q_selected_answer FROM exams AS e 
    LEFT JOIN answers as a ON e.id = a.exam_id
    LEFT JOIN questionries as q ON q.id in (e.question_ids) 
    WHERE e.id='${exam_id}' AND q.id =${nextQuestion} AND e.user_id = ${user_id}`;**/

  let query = `SELECT q.id as question_id, q.question AS q_title, q.options AS q_option,
     a.answer AS q_selected_answer FROM questionries AS q LEFT JOIN answers as a ON q.id = a.question_id WHERE q.id =${nextQuestion}`;

  return query;
};

/**
 * Updating answers for answer table
 * @param params parms to updatingh the answrs
 * @returns  returning query
 */

export const updateAnswerQuery = (params) => {
  let { exam_assign_id, question_id, user_id, selectedOption, answer_id } =
    params;

  let query = `UPDATE answers SET answer='${selectedOption}' WHERE id=${answer_id}`;

  return query;
};

/**
 * Insert query for answer table
 * @param params
 * @returns returning query
 */

export const insertAnswerQuery = (params) => {
  let { exam_assign_id, question_id, selectedOption, user_id } = params;

  let query = `INSERT INTO answers (exam_assign_id, user_id, question_id, answer) VALUES (${exam_assign_id},${user_id},${question_id},'${selectedOption}')`;

  return query;
};

/**
 * slect query genration
 * @param params
 * @returns returning select query
 */

export const selectAnswerQuery = (params) => {
  let { exam_assign_id, question_id, selectedOption, user_id } = params;

  let query = `SELECT * FROM answers WHERE exam_assign_id=${exam_assign_id} AND question_id=${question_id} AND user_id=${user_id}`;

  return query;
};

const updateAssignTable = (params) => {
  let { exam_assign_id, question_id, selectedOption, answer_id } = params;
  let query = `UPDATE exam_assign SET exam_end_date='${new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")}' WHERE id=${exam_assign_id}`;

  return query;
};

/**
 *
 * @param params
 * @param action
 * @returns
 */

const answerAction = async (params, action = "fetch") => {
  try {
    let { success, err } = validateParams(params, action);

    if (success) {
      let mysql = new MySQL();
      let query, rows;
      if (action === "fetch") {
        query = selectAnswerQuery(params);

        let [selectedRow] = await mysql.executeResults(query);

        if (selectedRow.length === 0) {
          query = insertAnswerQuery(params);
        } else {
          params.answer_id = selectedRow[0].id;
          query = updateAnswerQuery(params);
        }

        let [updateRow] = await mysql.executeResults(query);

        let updateAssinQuery = updateAssignTable(params);
        let [updateAssignRow] = await mysql.executeResults(updateAssinQuery);

        if (params.nextQuestion) {
          query = fetchQuestionQuery(params);

          [rows] = await mysql.executeResults(query);
        }
      }

      return NextResponse.json(
        {
          data: rows,
          success: true,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          err: err,
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        err: err,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};

/**
 *
 * @param req
 * @returns
 */

export async function POST(req: Request) {
  const params = await req.json();
  return answerAction(params);
}
