import { MySQL } from "@/src/helper/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cryptoRandomStringAsync } from "crypto-random-string";
import { ValidParms } from "@/src/helper/validParms";
import { CommonUtility } from "@/src/helper/common";

/**
 * Calling common utility class
 */

const commonUtility = new CommonUtility();

/**
 * Defining validation schema for creating exam
 */
const examParamsCValidation = z.object({
  sub_cat_id: z.number({
    required_error: "Please provide the sub category id",
    invalid_type_error: "Sub Category id must be number",
  }),
  complexity: z.number({
    required_error: "Please provide the Complexity oif exam",
    invalid_type_error: "Complexity must be a number",
  }),
  creator_id: z.number({
    required_error: " Please provide the creater ID",
    invalid_type_error: " Creater ID must be a number ",
  }),
  exam_duration: z
    .number({
      required_error: "Please provide the exam duration",
      invalid_type_error: "Exam duration must be a number",
    })
    .lte(100, {
      message: "Exam duration must be less than or equal to 100",
    }),
  questions_count: z
    .number({
      required_error: "Please provide the questions count",
      invalid_type_error: "Questions count duration must be a number",
    })
    .lte(100, {
      message: "Questions count must be less than or equal to 100",
    }),
});

//const examParmsWithArr = z.array(examParamsCValidation);

/**
 * update validation query
 */

const examUpdateParmsWithArr = examParamsCValidation.extend({
  exam_id: z.number({
    required_error: "Please provide the exam id",
    invalid_type_error: "Exam id should be a number",
  }),
  active: z.number({
    required_error: "Please provide the active status",
    invalid_type_error: "Active status should be a number",
  }),
});

/**
 * Exam Delete validation schema
 */

const examDeleteParams = z.array(
  examUpdateParmsWithArr.pick({ exam_id: true })
);

/**
 *
 * @param params Doing validation of parametres
 * @param action Defining that which action we are performing
 * @returns return object with boolean for success and error message
 */

const validationAction = (params, action: string = "add") => {
  const validParms = new ValidParms();
  if (action === "add") {
    return validParms.valid(examParamsCValidation, params);
  } else if (action === "update") {
    return validParms.valid(examUpdateParmsWithArr, params);
  } else if (action === "delete") {
    return validParms.valid(examDeleteParams, params);
  }
};

/**
 * Creating fetch query for running with MYsql
 * @param params is object which we are getting at time of search
 * @returns query with message
 */
const genrateFetchQuery = (params) => {

  let query,
    msg,
    whQery = "";

    console.log(params.requestType)

 

  if (params.searchText) {
    whQery = ` WHERE e.title LIKE '%${params.searchText}%'`;
  }

  if (params.user_id) {
    whQery +=
      (whQery.length > 0 ? ` AND ` : ` WHERE`) +
      ` e.user_id IN (${params.user_id})`;
  }

  if (params.exam_id) {
    whQery +=
      (whQery.length > 0 ? ` AND ` : ` WHERE`) + ` e.id IN (${params.exam_id})`;
  }

  if (params.active) {
    whQery +=
      (whQery.length > 0 ? ` AND ` : ` WHERE`) +
      ` e.active IN (${params.active})`;
  } else {
    whQery += (whQery.length > 0 ? ` AND ` : ` WHERE`) + ` e.active = 1`;
  }

  if (params.pending) {
    whQery +=
      (whQery.length > 0 ? ` AND ` : ` WHERE`) +
      ` e.status = (${params.pending})`;
  }

  if (params.page) {
    params.page = parseInt(params.page) > 0 ? parseInt(params.page) - 1 : 0;
  } else {
    params.page = 0;
  }

  if (params.limit) {
    params.limit = parseInt(params.limit) >= 0 ? parseInt(params.limit) : 20;
  } else {
    params.limit = 20;
  }

  if(params.requestType == "count"){
    query = `SELECT COUNT(*) AS rowCount FROM exams as e  `;

  }else{
    query = `SELECT e.id as exam_id,e.title, e.user_id, e.question_ids, e.status, e.exam_creation_date, e.exam_given_date, e.active, e.exam_link,
    e.questions_count, e.exam_duration,e.sub_cat_id,e.complexity, e.cat_id FROM exams as e  `;
    whQery += ` LIMIT ${params.limit} OFFSET ${params.page * params.limit}`;
  }

  

  query += whQery;


  return query;
};

/**
 * Collecting search parameter in one object
 * @param searchParams  getting searchParms from NextRequest
 * @returns formatted parms for seacrhing as object
 */

const genratefetchParms = (searchParams) => {
  let params = {};
  params = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
    user_id: searchParams.get("user_id"),
    exam_id: searchParams.get("exam_id"),
    complexity: searchParams.get("complexity"),
    cat_id: searchParams.get("cat_id"),
    sub_cat_id: searchParams.get("sub_cat_id"),
    active: searchParams.get("active"),
    pending: searchParams.get("pending"),
    searchText: searchParams.get("searchText"),
    requestType: searchParams.get("requestType"),

  };
  return params;
};
/**
 * Genrating MySQL query for insert exam data
 * @param params data reseved by server from user as object
 * @returns returning prepared query
 */

const createQueryforAdd = async (params) => {
  let query,
    queryValue = "";

  let exam_link_id = await commonUtility.genrateRandomStr(20, "url-safe");
  queryValue += `('${
    params.title
  }', ${`(SELECT GROUP_CONCAT(id ORDER BY RAND() LIMIT ${params.questions_count}) FROM questionries WHERE sub_cat_id= ${params.sub_cat_id} `} AND complexity=${
    params.complexity
  } AND active=1),${params.questions_count}, '${exam_link_id}', ${
    params.creator_id
  }, ${params.exam_duration}, ${params.sub_cat_id}, ${params.complexity}, ${params.cat_id})`;

  query = `INSERT INTO exams (title, question_ids, questions_count, exam_link, exam_created_by, exam_duration, sub_cat_id,complexity,cat_id) VALUES ${queryValue}`;

  return query;
};

/**
 * Genrating MySQL query for updating exam records
 * @param params data reseved by server from user as object
 * @returns returning prepared query
 */

const createUpdateQuery = async (params) => {
  let query = `UPDATE exams SET title='${params.title}',
  question_ids=(SELECT GROUP_CONCAT(id ORDER BY RAND() LIMIT ${params.questions_count}) 
  FROM questionries WHERE sub_cat_id= ${params.sub_cat_id}  AND 
  complexity=${params.complexity} AND active=1), questions_count = ${params.questions_count},
  active=${params.active}, exam_duration=${params.exam_duration}, exam_created_by=${params.creator_id}, 
  sub_cat_id=${params.sub_cat_id}, complexity=${params.complexity}, cat_id=${params.cat_id}  WHERE id=${params.exam_id}`;
  return query;
};

/**
 * Genrating MySQL query for deleting(soft) exam records
 * @param params data reseved by server from user as object
 * @returns returning prepared query
 */

const createDeleteQuery = (params) => {
  let userids = params.reduce((prev, curr) => {
    prev.push(curr.exam_id);
    return prev;
  }, []);
  let query = `UPDATE exams SET active=0 WHERE id IN (${userids})`;

  return query;
};

/**
 * Creating MySQL query as per provided info and action
 * @param params  requested parameter for creating query
 * @param action  Defining that which action we are performing
 */

const createQuery = async (params, action: string = "add") => {
  let query;
  let msg;
  let queryValue = "";
  let exam_link_id = await cryptoRandomStringAsync({
    length: 20,
    type: "url-safe",
  });

  if (action === "add") {
    query = await createQueryforAdd(params);
    msg = "Created";
  } else if (action === "update") {
    query = await createUpdateQuery(params);
    msg = "Updated";
  } else if (action === "delete") {
    query = createDeleteQuery(params);
    msg = "Deleted";
  } else if (action === "fetch") {
    query = genrateFetchQuery(params);
    msg = "fetched";
  }

  return {
    query,
    msg,
  };
};

/**
 * Defining the MYSql process
 * @param params  : Getting params which are given by SITE
 * @param action : MySQL operation perform as per given actiomn
 * @returns : Next response as per success or failure the MySQL operation
 */

const examAction = async (req, action: string = "add") => {
  try {
    let params;
    if (action === "fetch") {
      let serachParms = req.nextUrl.searchParams;
      params = genratefetchParms(serachParms);
    } else {
      params = await req.json();
    }

    let success, err;

    if (action === "fetch") {
      success = true;
    } else {
      let temp = validationAction(params, action);
      err = temp.err;
      success = temp.success;
    }
    if (success) {
      let { query, msg } = await createQuery(params, action);
      const mysql = new MySQL();
      const [rows] = await mysql.executeResults(query);

      if (action === "fetch") {
        return NextResponse.json(
          { data: rows, success: true },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: `Exam ${msg} successfully`, success: true },
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

/**
 * Handling GET HTTP request
 * @param req  parms as NextRequest object
 * @returns returning Nextresponse object with status code, data and message as per record
 */
export async function GET(req: NextRequest) {
  return examAction(req, "fetch");
}

/**
 * Handling POST HTTP request
 * @param req  parms as Request object
 * @returns returning Nextresponse object with status code, data and message as per record
 */

export async function POST(req: Request) {
  return examAction(req, "add");
}

/**
 * Handling PATCH HTTP request
 * @param req  parms as Request object
 * @returns returning Nextresponse object with status code, data and message as per record
 */

export async function PATCH(req: Request) {
  return examAction(req, "update");
}

/**
 * Handling DELETE HTTP request
 * @param req  parms as Request object
 * @returns returning Nextresponse object with status code, data and message as per record
 */

export async function DELETE(req: Request) {
  return examAction(req, "delete");
}
