import { MySQL } from "@/src/helper/db";
import { promises } from "dns";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { checkFileAndReturnData } from "@/src/helper/fileHandling";

const examValidationScema = z.object({
  question: z.string({
    required_error: "Please provide the question",
  }),
  q_opt: z.object({}).required(),
  q_right_opt: z.string({
    required_error: "Please provide the right options",
  }),
  user_id: z.number({
    required_error: "Please provide the user id and it must be number",
    invalid_type_error: "Please provide the user id as number",
  }),
  cat_id: z.number({
    required_error: "Please provide the catgoery id",
  }),
  sub_cat_id: z.number({
    required_error: "Please provide the sub catgoery id",
  }),
  complexity: z.number({
    required_error: "Please provide the complexity",
  }),
});

const deleteValidSchema = z.object({
  q_id: z.number({
    required_error: "Please provide the question id",
  }),
  active: z.number({
    required_error: "Please provide the active status",
  }),
});

const csvValidation = z.array(examValidationScema);

//: "Please provide the question options",

export const questionAction = async (
  req: Request,
  type: string = "add",
  pramObject: object | boolean = false
) => {
  let params;
  if (!pramObject) {
    params = await req.json();
  } else {
    params = pramObject;
  }

  try {
    let result;
    if (!pramObject) {
      if (type === "delete") {
        result = deleteValidSchema.safeParse(params);
      } else {
        result = examValidationScema.safeParse(params);
      }
    } else {
      result = csvValidation.safeParse(params);
    }

    if (result.success) {
      let QUERY = "";
      let msg = "";
      let options = params.q_opt;
      if (type === "add") {
        if (!pramObject) {
          QUERY = `INSERT INTO questionries (question, options, right_option,complexity,cat_id, sub_cat_id, created_by) VALUES ('${
            params.question
          }',
          '${JSON.stringify(params.q_opt)}', '${params.q_right_opt}',${
            params.complexity
          },${params.cat_id},${params.sub_cat_id}, ${params.user_id})`;
        } else {
          QUERY = `INSERT INTO questionries (question, options, right_option,complexity,cat_id, sub_cat_id, created_by) VALUES`;
          let val = "";
          params.forEach((item, index) => {
            val += ` ('${item.question}','${JSON.stringify(item.q_opt)}', '${
              item.q_right_opt
            }',${item.complexity},${item.cat_id},${item.sub_cat_id}, ${
              item.user_id
            })`;

            if (index < params.length - 1) {
              val += `,`;
            }
          });

          QUERY += val;
        }

        msg = "Created";
      } else if (type === "update") {
        QUERY = `UPDATE questionries SET question = '${
          params.question
        }', options = '${JSON.stringify(params.q_opt)}',
        right_option='${params.q_right_opt}', complexity=${params.complexity},
        active=${params.active},cat_id=${params.cat_id}, sub_cat_id=${
          params.sub_cat_id
        },
        updated_at='${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}' WHERE id = ${params.q_id} `;
        msg = "Updated";
      } else if (type === "delete") {
        QUERY = `UPDATE questionries SET active = ${
          params.active
        },updated_at='${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}' WHERE id = ${params.q_id}`;
        msg = "Deleted";
      }
      const mysql = new MySQL();
      const result = await mysql.executeResult(QUERY);

      return NextResponse.json(
        { message: `Questions ${msg} successfuly`, success: true },
        { status: 200 }
      );
    } else {
      const formatted = result.error.issues;

      const custErr = Array();

      formatted.forEach((ele) => {
        custErr.push({ message: ele.message });
      });

      return NextResponse.json(
        { err: custErr, success: false },
        { status: 500 }
      );
    }
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
  const params = req.nextUrl.searchParams;

  const q_id = params.get("q_id");
  const searchText = params.get("searchText");
  const cat_id = params.get("cat_id");
  const sub_cat_id = params.get("sub_cat_id");
  const complexity = params.get("complexity");
  const limit = params.get("limit");
  const page = params.get("page");
  const active = params.get("active");
  const requestType = params.get("requestType");

  try {
    let WHSTR = "";
    if (searchText) {
      WHSTR = ` WHERE (q.question LIKE '%${searchText}%' OR q.options LIKE '%${searchText}%')`;
    }

    if (cat_id) {
      if (WHSTR.length > 0) {
        WHSTR += ` AND q.cat_id = ${cat_id} `;
      } else {
        WHSTR += ` WHERE q.cat_id = ${cat_id} `;
      }
    }

    if (sub_cat_id) {
      if (WHSTR.length > 0) {
        WHSTR += ` AND q.sub_cat_id = ${sub_cat_id} `;
      } else {
        WHSTR += ` WHERE q.sub_cat_id = ${sub_cat_id} `;
      }
    }

    if (complexity) {
      if (WHSTR.length > 0) {
        WHSTR += ` AND q.complexity = ${complexity} `;
      } else {
        WHSTR += ` WHERE q.complexity = ${complexity} `;
      }
    }
    if (active) {
      if (WHSTR.length > 0) {
        WHSTR += ` AND q.active = ${active} `;
      } else {
        WHSTR += ` WHERE q.active = ${active} `;
      }
    }
    if (q_id) {
      if (WHSTR.length > 0) {
        WHSTR += ` AND q.id = ${q_id} `;
      } else {
        WHSTR += ` WHERE q.id = ${q_id} `;
      }
    }

    const mysql = new MySQL();

    if (requestType) {
      let QUERY =
        `SELECT COUNT(*) AS rowCount  FROM questionries AS q  INNER JOIN sub_categories AS subcat ON q.sub_cat_id = subcat.id
    INNER JOIN categories as cat ON subcat.catgeory_id = cat.id 
   INNER JOIN users as u ON q.created_by = u.id ` + WHSTR;

      const [rows] = await mysql.executeResult(QUERY);
      return NextResponse.json(
        {
          data: rows,
          success: true,
        },
        { status: 200 }
      );
    } else {
      if (limit) {
        WHSTR += ` ORDER BY q.id DESC  limit ${limit}`;
      }
      let QUERY =
        `SELECT q.id, q.question, q.options, q.right_option, q.complexity, q.active, subcat.sub_category_name,subcat.id as sub_cat_id, cat.category_name, cat.id as cat_id, u.full_name, u.id as user_id  FROM questionries AS q  INNER JOIN sub_categories AS subcat ON q.sub_cat_id = subcat.id
    INNER JOIN categories as cat ON subcat.catgeory_id = cat.id 
   INNER JOIN users as u ON q.created_by = u.id ` + WHSTR;

      const [rows] = await mysql.executeResult(QUERY);
      return NextResponse.json(
        {
          data: rows,
          success: true,
        },
        { status: 200 }
      );
    }
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
}

export async function POST(req: Request) {
  // const formData = await req.formData();

  const headerList = headers();

  if (headerList.get("content-type") === "application/json") {
    return questionAction(req, "add");
  } else {
    const formData = await req.formData();

    const file = formData.get("question");
    const user_id = formData.get("user_id");
    const cat_id = formData.get("cat_id");
    const sub_cat_id = formData.get("sub_cat_id");
    if (!file) {
      return NextResponse.json(
        {
          err: "No files received.",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    const resData = await checkFileAndReturnData(file);

    if (resData.success) {
      return genrateData(resData.fileContent, user_id, cat_id, sub_cat_id);
    } else {
      return NextResponse.json(resData, { status: 500 });
    }
  }
}

export async function PATCH(req: Request) {
  return questionAction(req, "update");
}
export async function DELETE(req: Request) {
  return questionAction(req, "delete");
}

export const genrateData = async (fileContent, user_id, cat_id, sub_cat_id) => {
  let lines = fileContent.split("\n");
  let req: Request;
  let csvLineData = [];
  lines.forEach(async (line, index) => {
    if (index > 0) {
      let cells = line.split(",");

      csvLineData.push({
        question: cells[1],
        q_opt: {
          a: cells[2],
          b: cells[3],
          c: cells[4],
          d: cells[5],
        },
        q_right_opt: cells[6],
        cat_id: parseInt(cat_id),
        sub_cat_id: parseInt(sub_cat_id),
        complexity: parseInt(cells[7]),
        user_id: parseInt(user_id),
      });
    }
  });

  return questionAction(req, "add", csvLineData);
};
