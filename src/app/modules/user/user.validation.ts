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
    role: z.enum(["admin", "user"], {
      message: 'Role must be either "admin" or "user"',
    }),
    address: z.string({ message: "Address is required" }),
  }),
});

// const updateUser = z.object({
//   body: z.object({
//     name: z
//       .string()
//       .min(2, { message: "Name must be at least 2 characters long" })
//       .max(50, { message: "Name cannot exceed 50 characters" })
//       .optional(),
//     email: z.string().email({ message: "Invalid email format" }).optional(),
//     password: z
//       .string()
//       .min(6, { message: "Password must be at least 6 characters long" })
//       .max(20, { message: "Password cannot exceed 20 characters" })
//       .optional(),
//     phone: z
//       .string()
//       .min(10, { message: "Phone number must be at least 10 digits long" })
//       .max(15, { message: "Phone number cannot exceed 15 digits" })
//       .optional(),
//     role: z
//       .enum(["admin", "user"], {
//         message: 'Role must be either "admin" or "user"',
//       })
//       .optional(),
//     address: z
//       .string()
//       .min(5, { message: "Address must be at least 5 characters long" })
//       .max(100, { message: "Address cannot exceed 100 characters" })
//       .optional(),
//   }),
// });


const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),

  })
})

// const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({ required_error: "Refresh token is required!" }),
//   })
// });

export const userValidationSchema = {
  createUser,
  loginValidationSchema,
  // refreshTokenValidationSchema
};
