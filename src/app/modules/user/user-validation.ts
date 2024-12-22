import { z } from "zod";
const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(["admin", "user"]).default("user"),
    isBlocked: z.boolean().default(false),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const Uservalidation = {
    userValidationSchema,
    loginValidationSchema
}



