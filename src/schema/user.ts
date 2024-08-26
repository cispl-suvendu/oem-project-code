import { z } from "zod";

const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
export const userAddformSchema = z.object({
  full_name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  phone_number: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(indianPhoneNumberRegex, { message: "Invalid phone number" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters" }).optional(),
  type: z.string().refine(val => val !== "-1", { message: "User type must be selected." }),
  role: z.string().refine(val => val !== "-1", { message: "User role must be selected." }),
});


export const userEditformSchema = z.object({
  full_name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  phone_number: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(indianPhoneNumberRegex, { message: "Invalid phone number" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters" }).optional(),
  type: z.string().refine(val => val !== "-1", { message: "User type must be selected." }),
  role: z.string().refine(val => val !== "-1", { message: "User role must be selected." }),
  active: z.string().refine(val => val !== "-1", { message: "User status must be selected." })
});