import { z } from "zod";
const indianPhoneNumberRegex = /^[6-9]\d{9}$/;


export const formSchema = z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required" }),
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Please enter a valid email" }),
    phone: z
      .string().nonempty({ message: "Phone is required" })
      .regex(indianPhoneNumberRegex, { message: "Invalid phone number" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 8 characters" }),
      confirmPassword: z
      .string()
      .nonempty({message : "This field is required"})
    }).refine((data) => data.password === data.confirmPassword, {

      path : ["confirmPassword"],
      message : "Passwords do not match"
  });