import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { bookingStatus, paymentStatus } from "./booking.constant";

// Mongoose schema
const BookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    vehicleType: {
      type: String,
      enum: [
        "car",
        "truck",
        "van",
        "motorcycle",
        "bus",
        "electricVehicle",
        "hybridVehicle",
        "bicycle",
        "tractor",
      ],
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [paymentStatus.pending, paymentStatus.paid, paymentStatus.failed],
      default: paymentStatus.pending,
      required: true,
    },
    status: {
      type: String,
      enum: [bookingStatus.pending, bookingStatus.completed, bookingStatus.failed],
      default: bookingStatus.pending,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export Mongoose model
export const BookingModel = model<TBooking>("Booking", BookingSchema);
