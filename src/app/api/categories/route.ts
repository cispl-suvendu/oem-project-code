import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MySQL } from "@/src/helper/db";
import { ValidParms } from "@/src/helper/validParms";
import { CommonUtility } from "@/src/helper/common";

const commonUtility = new CommonUtility();
/**
 * Creating category validation Schema
 */
const categoryValidSchema = z.object({
  cat_name: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category name must be a string",
    })
    .min(3, {
      message: "Category name must be 3 or more characters long ",
    }),
  user_id: z.number({
    required_error: "User id is required",
    invalid_type_error: "User id is number",
  }),
  cat_description: z.string({
    required_error: "Category description is required",
  }),
});

/**
 * Category updation schema
 */

const catUpdateValidschema = categoryValidSchema.extend({
  cat_id: z.number({
    required_error: "Must provide the category id",
    invalid_type_error: " Category ID must be a number",
  }),
  active: z
    .number({
      invalid_type_error: "Active status must be a number",
    })
    .optional(),
});

/**
 * Category Deletion schema
 */

const deleteValidSchema = catUpdateValidschema.pick({ cat_id: true });

/**
 * Checking Validation of parmeter with ZOD validation concept
 * @param parms  Parmeter send by the user
 * @param action Which type of action perfomred by user
 * @returns retrun success true or false and if fals then with validation error
 */

const checkValidation = (parms, action: string = "add") => {
  let validParms = new ValidParms();
  if (action === "add") {
    return validParms.valid(categoryValidSchema, parms);
  } else if (action === "update") {
    return validParms.valid(catUpdateValidschema, parms);
  } else if (action === "delete") {
    return validParms.valid(deleteValidSchema, parms);
  }

  return {
    success: false,
  };
};

/**
 * Genrated the MySql query as per condition
 * @param params  Parmeter send by the user
 * @param action  Action by the user
 * @returns returning genrated query and sucess as true or false
 */

const createQuery = async (params, action: string = "add") => {
  let query;
  let msg;

  if (action === "add") {
    let cat_slug = await commonUtility.genrateRandomStr(10, "url-safe");

    query = `INSERT INTO categories(category_name, cat_description, cat_slug , created_by) 
    VALUES ('${params.cat_name}','${params.cat_description}','${cat_slug}','${params.user_id}') `;
    msg = "Created";
  } else if (action === "update") {
    let active = 1;
    if (params.active) {
      active = params.active;
    }
    query = `UPDATE categories SET category_name='${
      params.cat_name
    }', cat_description='${params.cat_description}', updated_at='${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}', active=${active} WHERE id='${params.cat_id}' `;
    msg = "Updated";
  } else if (action === "delete") {
    query = `UPDATE categories SET active=0 WHERE id=${params.cat_id} `;
    msg = "DELETED";
  }

  return {
    query,
    msg,
  };
};

const categoryAction = async (req: Request, type: string = "add") => {
  const paramsData = await req.json();

  try {
    let { err, success } = checkValidation(paramsData, type);
    if (success) {
      let { query, msg } = await createQuery(paramsData, type);
      const mysql = new MySQL();

      const [insertedId] = await mysql.executeResult(query);

      return NextResponse.json(
        { message: `Category ${msg} successfully`, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ err: err, success: false }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json(
      { err: err.message, success: false },
      { status: 500 }
    );
  }
};
/**
 * Fetch the categories as per user given condition
 * @param req getting the params as NextRequest
 * @returns fetched data from DB to user
 */

export async function GET(req: NextRequest) {
  let active;
  const paramsData = req.nextUrl.searchParams;
  const searchText = paramsData.get("searchText");
  const requestType = paramsData.get("requestType");

  active = paramsData.get("active");
  const cat_id = paramsData.get("cat_id");
  let limit = parseInt(paramsData.get("limit"));
  let page = parseInt(paramsData.get("page"));
  const mysql = new MySQL();
  try {
    let whQery = "";
    if (searchText) {
      whQery = ` WHERE (category_name LIKE '%${searchText}%' OR cat_description LIKE '%${searchText}%')`;
    }

    active = active ? active : 1;

    if (active) {
      whQery += (whQery.length > 0 ? ` AND ` : ` WHERE `) + `active=${active}`;
    }

    if (requestType == "count") {
      let query = "SELECT COUNT(*) AS rowCount FROM categories";
      query += whQery;
      let [result] = await mysql.executeResult(query);
      return NextResponse.json(
        {
          data: result,
          success: true,
        },
        { status: 200 }
      );
    } else {
      let query =
        "SELECT id,category_name, cat_description, active, cat_slug FROM categories";

      if (!limit) {
        limit = 20;
      }

      if (!page) {
        page = 0;
      } else {
        page -= 1;
        page *= limit;
      }

      if (cat_id) {
        whQery = ` WHERE id=${cat_id}`;
      }

      whQery += ` LIMIT ${limit} OFFSET ${page}`;

      query += whQery;

      let [result] = await mysql.executeResult(query);
      return NextResponse.json(
        {
          data: result,
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { err: err.message, success: false },
      { status: 500 }
    );
  }
}

/**
 * Creating categories using POST method
 * @param req  Reqest type and fetching the user
 * @returns  as nextResponse as per action
 */

export async function POST(req: Request) {
  return categoryAction(req, "add");
}

/**
 * Updating categories using PATCH method
 * @param req  Reqest type and fetching the user
 * @returns  as nextResponse as per action
 */

export async function PATCH(req: Request) {
  return categoryAction(req, "update");
}

/**
 * Deleting categories using DELETE method
 * @param req  Reqest type and fetching the user
 * @returns  as nextResponse as per action
 */
export async function DELETE(req: Request) {
  return categoryAction(req, "delete");
}

/**
 * Updating categories using PUT method for specific reason
 * @param req  Reqest type and fetching the user
 * @returns  as nextResponse as per action
 */

export async function PUT(req: Request) {
  //console.log(req);
}
