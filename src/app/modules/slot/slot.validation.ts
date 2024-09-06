import { z } from "zod";
import { slotStatus } from "./slot.constant";

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
    isBooked: z.enum([slotStatus.available, slotStatus.booked, slotStatus.canceled], {
      message: `Status must be either ${slotStatus.available, slotStatus.booked, slotStatus.canceled}`,
    }).default(slotStatus.available).optional(),
  }),
});

const updateSlotStatus = z.object({
  body: z.object({
    isBooked: z.enum([slotStatus.available, slotStatus.booked, slotStatus.canceled], {
      message: `Status must be either ${slotStatus.available}, ${slotStatus.booked} or ${slotStatus.canceled}`,
    }).default(slotStatus.available).optional(),
  }),
});

export const slotValidationSchema = {
  createSlot,
  updateSlotStatus
};
