import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MySQL } from "@/src/helper/db";

/**
 * subCatValidationSchema :  Subcategory validation schema
 */

const subCatValidationSchema = z.object({
  sub_cat_name: z
    .string({
      required_error: " Sub Category name is required",
      invalid_type_error: "Sub Category name must be a string",
    })
    .min(3, {
      message: "Sub Category name must be 3 or more characters long ",
    }),
  user_id: z.number({
    required_error: "User id is required",
  }),
  cat_id: z.number({
    required_error: "Category id is required",
  }),
  sub_cat_slug: z.string({
    required_error: "Sub Category slug is required",
  }),
});

/**
 * adding the xtra validation for updation
 */

const subCatUpdateSchema = subCatValidationSchema.extend({
  sub_cat_id: z.number({
    required_error: "Sub Category id is required",
  }),
});

/**
 * only will check sub cat id for deletion
 */

const subCateDelSchema = subCatUpdateSchema.pick({ sub_cat_id: true });

/**
 *
 * @param req: params is object
 * @param action : action type
 * @returns valid result
 */

const paramsValidation = (params, action: string = "add") => {
  let result;

  if (action === "add") {
    result = subCatValidationSchema.safeParse(params);
  } else if (action === "update") {
    result = subCatUpdateSchema.safeParse(params);
  } else if (action === "delete") {
    result = subCateDelSchema.safeParse(params);
  }

  if (result.success) {
    return {
      success: true,
    };
  } else {
    let formatted = result.error.issues;
    let custErr = Array();

    formatted.forEach((ele) => {
      custErr.push({ message: ele.message });
    });

    return {
      err: custErr,
      success: false,
    };
  }
};

/**
 *
 * @param req: params data as object
 * @param action: action as string like add, delete, update
 * @returns as object: returning query and related message
 */

const createQuery = (paramsData, action: string = "add") => {
  let query = "";
  let msg = "";

  if (action === "add") {
    query = `INSERT INTO sub_categories(catgeory_id,sub_cat_slug,	sub_category_name, created_by) 
        VALUES ('${paramsData.cat_id}','${paramsData.sub_cat_slug}','${paramsData.sub_cat_name}','${paramsData.user_id}') `;
    msg = "Created";
  } else if (action === "update") {
    query = `UPDATE sub_categories SET sub_category_name='${
      paramsData.sub_cat_name
    }',sub_cat_slug='${paramsData.sub_cat_slug}', updated_at='${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}', active=${paramsData.active} WHERE id='${paramsData.sub_cat_id}' `;
    msg = "Updated";
  } else if (action === "delete") {
    query = `DELETE FROM sub_categories WHERE id='${paramsData.sub_cat_id}' `;
    msg = "DELETED";
  } else if (action === "select") {
    query = `SELECT * FROM sub_categories`;
  }

  return {
    query,
    msg,
  };
};

/**
 *
 * @param req: object
 * @param type : required action
 * @returns : NextResponse format as result of execution
 */

const subCategoryAction = async (req: Request, type: string = "add") => {
  const paramsData = await req.json();

  let { err, success } = paramsValidation(paramsData, type);

  try {
    if (success) {
      let { query, msg } = createQuery(paramsData, type);

      const mysql = new MySQL();

      const [rows] = await mysql.executeResult(query);

      return NextResponse.json(
        { message: `Sub Category ${msg} successfuly`, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ err: err, success: false }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ err: err, success: false }, { status: 500 });
  }
};

/**
 *
 * @param req
 * @returns
 */

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  let active;

  const cat_id = params.get("cat_id");
  const searchText = params.get("searchText");
  active = params.get("active");
  let sub_cat_id = params.get("sub_cat_id");
  let requestType = params.get("requestType");

  try {
    let WHSTR = "";
    if (cat_id) {
      WHSTR = ` WHERE scat.catgeory_id='${cat_id}'`;
    }
    if (searchText) {
      WHSTR +=
        (WHSTR.length > 0 ? ` AND ` : ` WHERE `) +
        `scat.sub_category_name LIKE '%${searchText}%'`;
    }

    active = active ? active : "1";
    WHSTR += (WHSTR.length > 0 ? ` AND ` : ` WHERE `) + `scat.active=${active}`;

    if(sub_cat_id){
      WHSTR += (WHSTR.length > 0 ? ` AND ` : ` WHERE `) + `scat.id=${sub_cat_id}`;
    }

    const mysql = new MySQL();

     if(requestType == 'count'){
      console.log("Chat is ");
      let QUERY = `SELECT COUNT(*) AS rowCount FROM sub_categories AS scat LEFT JOIN categories AS cat ON cat.id = scat.catgeory_id  ${WHSTR}`;
      const [rows] = await mysql.executeResult(QUERY);
      return NextResponse.json(
        {
          data: rows,
          success: true,
        },
        { status: 200 }
      );

     }else{
      let QUERY = `SELECT scat.id,scat.catgeory_id, scat.sub_cat_slug, scat.sub_category_name,
     scat.created_by, scat.active FROM sub_categories AS scat LEFT JOIN categories AS cat ON cat.id = scat.catgeory_id  ${WHSTR}`;
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
      { status: 500 }
    );
  }
}

/**
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  return subCategoryAction(req, "add");
}
/**
 *
 * @param req
 * @returns
 */
export async function PATCH(req: Request) {
  return subCategoryAction(req, "update");
}
/**
 *
 * @param req
 * @returns
 */
export async function DELETE(req: Request) {
  return subCategoryAction(req, "delete");
}
