import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name cannot exceed 50 characters" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    phone: z
      .string({ message: "Phone is required" })
      .min(10, { message: "Phone number must be at least 10 digits long" })
      .max(15, { message: "Phone number cannot exceed 15 digits" }),
    role: z
      .enum(["admin", "user"], {
        message: 'Role must be either "admin" or "user"',
      })
      .default("user"),
    address: z.string({ message: "Address is required" }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

export const userValidationSchema = {
  createUser,
  loginValidationSchema,
};
