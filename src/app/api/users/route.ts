import { NextRequest, NextResponse } from "next/server";
import { MySQL } from "@/src/helper/db";
import { GenerateHasPassword } from "@/src/helper/hassedPassword";
import { z } from "zod";
import { cryptoRandomStringAsync } from "crypto-random-string";

/***
 * @using z as zod object and creating schema for validation
 * userSchema is used for addition
 */

const userSchema = z.object({
  full_name: z
    .string({
      required_error: "Full Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(5, { message: "Fill Name Must be 5 or more characters long " }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  phone_number: z
    .string({
      required_error: "Phone Number is required",
    })
    .length(10, { message: "Phone number Must be exactly 10 characters long" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password Must be 8 or more characters long " }),
  role: z.number().optional(),
  type: z.number().optional(),
});

/**
 * ZOD schema for updation,
 * adding userd id in userUpdateValidation and removed the password for validation
 */

const userUpdateValidation = userSchema
  .extend({
    user_id: z.number({
      required_error: "Must provide the user id",
      invalid_type_error: "user_id be a number",
    }),
    active: z.number().optional(),
  })
  .omit({ password: true });

/**
 * zod object only check the user id
 */

const userDelValidSchema = userUpdateValidation.pick({
  user_id: true,
});

/***
 * validParms function is using for the validation of params as per action,
 * @param:  parameter object, action
 * @param: action type
 * @return: validation error or result
 */

const validParms = (params: object, action: string = "add") => {
  let result;

  if (action === "add") {
    result = userSchema.safeParse(params);
  } else if (action === "update") {
    result = userUpdateValidation.safeParse(params);
  } else if (action === "delete") {
    result = userDelValidSchema.safeParse(params);
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

/***
 * makeQuery:  Preparing query as per action
 * @param: parameter object
 * @param: action type
 * @retrun genrated query and message as per action
 */

const makeQuery = async (parmsData, action: string = "add") => {
  let query;
  let msg;

  if (!parmsData.active) {
    parmsData.active = 1;
  }

  if (!parmsData.type) {
    parmsData.type = 0;
  }

  if (!parmsData.role) {
    parmsData.role = 0;
  }

  if (action === "add") {
    let generateHasPassword = new GenerateHasPassword();
    let hasRec = generateHasPassword.create(parmsData.password);
    let salt = hasRec.salt;
    let hashedPassword = hasRec.hashedPassword;
    let user_id = await cryptoRandomStringAsync({
      length: 10,
      type: "base64",
    });

    query = `INSERT INTO users (user_id, full_name, phone_number, email, password, salt, active, role, type) VALUES 
    ('${user_id}', '${parmsData.full_name}', '${parmsData.phone_number}', '${parmsData.email}', '${hashedPassword}', '${salt}', ${parmsData.active}, ${parmsData.role}, ${parmsData.type}) `;
    msg = "Created";
  } else if (action === "update") {
    query = `UPDATE users SET full_name = '${parmsData.full_name}', phone_number = 
            '${parmsData.phone_number}', email = '${parmsData.email}', active=${parmsData.active}, role=${parmsData.role}, type=${parmsData.type}
            WHERE id = '${parmsData.user_id}' AND NOT role = 2`;

    msg = "Updated";
  } else if (action === "delete") {
    query = `UPDATE users SET active = 0  WHERE id = '${parmsData.user_id}' AND NOT role =2`;
    msg = "Deleted";
  }

  return {
    query,
    msg,
  };
};

/**
 * userActions:  running mysql action
 * @param req: Request params
 * @param type:  action
 * @returns nextResponse
 */

export const userActions = async (req: Request, type: string = "add") => {
  const parmsData = await req.json();

  try {
    let modifyParmsData = {
      ...parmsData,
      active: parseInt(parmsData.active ? parmsData.active : 1),
      role: parseInt(parmsData.role ? parmsData.active : 1),
      type: parseInt(parmsData.type ? parmsData.type : 1),
    };
    let { err, success } = validParms(modifyParmsData, type);
    if (success) {
      let { query, msg } = await makeQuery(parmsData, type);
      const mysql = new MySQL();
      const [inserted] = await mysql.executeResult(query);

      await mysql.connection.end();
      return NextResponse.json(
        { message: `User ${msg} successfully`, success: true },
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

const fetchCount = () => {};

/***
 * GET Method to fetch URL,
 * @param Req: Next Request,
 * @returns NextResponse : fetching user Data and retruning user details
 */

export async function GET(req: NextRequest) {
  const paramData = req.nextUrl.searchParams;

  try {
    const requestType = paramData.get("requestType");
    const searchText = paramData.get("searchText");
    let role = paramData.get("role");
    const count = paramData.get("limit");
    let pageNumber = paramData.get("page");
    const active = paramData.get("active");
    let limit = paramData.get("limit")

    const mysql = new MySQL();

    let WHSTR = "";

    if (searchText) {
      WHSTR += ` WHERE full_name LIKE '%${searchText}%'`;
    }

    if (role) {
      WHSTR +=
        WHSTR.length > 0
          ? ` AND role IN (${role} )`
          : ` WHERE role IN (${role} ) `;
    }

    WHSTR += (WHSTR.length > 0 ? " AND " : " WHERE ") + `active IN (${active})`;

    if (requestType == "count") {
      let QUERY = "SELECT COUNT(*) AS rowCount FROM users";
      QUERY += WHSTR;
      
      let [rows] = await mysql.executeResult(QUERY);
      return NextResponse.json(
        {
          data: rows,
          success: true,
        },
        { status: 200 }
      );
    } else {
      let QUERY =
        "SELECT id, email,full_name, phone_number, phone_number, role, type, active FROM users";
      let page = 1;
      if (pageNumber) {
        page = parseInt(pageNumber);
      }

      let limit = 20;
      if (count) {
        limit = parseInt(count);
      }

      let offsetVal = (page - 1) * limit;

      WHSTR += ` ORDER BY id DESC LIMIT ${limit} OFFSET ${offsetVal}`;

      QUERY += WHSTR;

     

      let [rows] = await mysql.executeResult(QUERY);
      return NextResponse.json(
        {
          data: rows,
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

/***
 * POST method,
 * @param Req Request: getting params from site
 * @returns NextResponse: Creating user and returning confirmtion if sucessfuly or returning error
 */

export async function POST(req: Request) {
  return userActions(req, "add");
}

/**
 * PATCH method
 * @param req: Request: getting params
 * @returns NextResponse: Returning updation confirmation or error
 */

export async function PATCH(req: Request) {
  return userActions(req, "update");
}

/**
 * DELETE method
 * @param req: Request: getting params
 * @returns NextResponse: Returning Deletion confirmation or error
 */

export async function DELETE(req: Request) {
  return userActions(req, "delete");
}
