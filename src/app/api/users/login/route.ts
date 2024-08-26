import { MySQL } from "@/src/helper/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { GenerateHasPassword } from "@/src/helper/hassedPassword";
import { jwtToken } from "../../../services/auth";

export async function POST(req: Request) {
  const loginValidSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const { email, password } = await req.json();

  const result = loginValidSchema.safeParse({ email, password });

  try {
    if (result.success) {
      const mysql = new MySQL();
      const [user] = await mysql.executeRows(
        
        `SELECT * FROM users WHERE email='${email}'`
      );

      if (user.length > 0) {
        const generateHasPassword = new GenerateHasPassword();
        const passwordMatched = generateHasPassword.match(
          user[0].password,
          user[0].salt,
          password
        );

        if (passwordMatched) {
          const jwttoken = new jwtToken();
          const token = await jwttoken.create(user[0]);

          return NextResponse.json(
            {
              token: token,
              success: true,
            },
            {
              status: 200,
            }
          );
        } else {
          return NextResponse.json(
            { err: "Password is incorrect", success: false },
            { status: 500 }
          );
        }
        // const match =
      } else {
        return NextResponse.json(
          { err: "User is not found", success: false },
          { status: 500 }
        );
      }
    } else {
      const formatted = result.error.issues;
      const custErr = Array();

      formatted.forEach((ele) => {
        custErr.push({ err: ele.message ,success: false });
      });

      return NextResponse.json({ err: custErr ,success: false }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ err: err.message ,success: false }, { status: 500 });
  }
}
