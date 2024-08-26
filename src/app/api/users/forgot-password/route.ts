import { NextResponse } from "next/server";
import { z } from "zod";
import { MySQL } from "@/src/helper/db";
import { GenerateHasPassword } from "@/src/helper/hassedPassword";

const validSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password Must be 8 or more characters long" }),
});

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const result = validSchema.safeParse({ email, password });

  try {
    if (result.success) {
      let generateHasPassword = new GenerateHasPassword();
      let { hashedPassword, salt } = generateHasPassword.create(password);
      let QUERY = `UPDATE users SET password='${hashedPassword}', salt="${salt}" WHERE email='${email}'`;
      let mysql = new MySQL();

      let [rows] = await mysql.executeResults(QUERY);

      await mysql.connection.end();
      return NextResponse.json(
        { message: `Password updated successfully`, success: true },
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
      { status: 500 }
    );
  }
}
