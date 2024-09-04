import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";
import { slotStatus } from "./slot.constant";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: [slotStatus.available, slotStatus.booked, slotStatus.canceled],
      required: true,
      default: slotStatus.available
    },
  },
  {
    timestamps: true,
  },
);

export const SlotModel = model<TSlot>("Slot", slotSchema);
