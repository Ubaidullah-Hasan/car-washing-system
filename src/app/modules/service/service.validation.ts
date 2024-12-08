import { z } from "zod";

const createService = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }),
    description: z.string({ message: "Description is required" }),
    price: z.number({ message: "Price must be a positive number" }).positive(),
    duration: z.number({ message: "Duration must be a positive number" }).positive(),
    isDeleted: z.boolean().default(false),
    isPopular: z.boolean().default(false), // Added validation
    isBestSale: z.boolean().default(false), // Added validation
    offer: z
      .number({ message: "Offer must be a positive number" })
      .min(0, { message: "Offer cannot be less than 0%" })
      .max(100, { message: "Offer cannot be more than 100%" })
      .default(0), // Added validation
  }),
});

const updateService = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }).optional(),
    description: z.string({ message: "Description is required" }).optional(),
    price: z.number({ message: "Price must be a positive number" }).optional(),
    duration: z
      .number({ message: "Duration must be a positive number" })
      .optional(),
  }),
});

export const serviceValidationSchema = {
  createService,
  updateService,
};
