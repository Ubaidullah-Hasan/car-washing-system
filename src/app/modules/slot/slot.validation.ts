import { z } from "zod";

const createSlot = z.object({
  body: z.object({
    service: z.string({ message: "Service is required" }),
    date: z
      .string({ message: "Date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    startTime: z.string({ message: "Start time is required" }),
    endTime: z.string({ message: "End time is required" }),
    isBooked: z.enum(["available", "booked", "canceled"], {
      message: "Status must be either 'available', 'booked', or 'canceled'",
    }).optional(),
  }),
});

export const slotValidationSchema = {
  createSlot,
};
