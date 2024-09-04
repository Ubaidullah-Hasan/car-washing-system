import { z } from "zod";
import { bookingStatus, paymentStatus } from "./booking.constant";

const createBooking = z.object({
  body: z.object({
    customer: z.string({ message: 'Customer id is required!' }),
    serviceId: z.string({ message: "Service id is required!" }),
    slotId: z.string({ message: "Slot id is required!" }),
    vehicleType: z.enum(
      [
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
      {
        message: "Vehicle type car | truck | van | motorcycle | bus |  electricVehicle | hybridVehicle | bicycle | tractor"
      },
    ),
    vehicleBrand: z.string({ message: "Vehicle brand is required!" }),
    vehicleModel: z.string({ message: "Vehicle model is required!" }),
    manufacturingYear: z.number().min(1886).max(new Date().getFullYear()),
    registrationPlate: z.string({ message: "Registration plate is required!" }),
    phone: z.string({ message: "Phone number must string!" }),
    name: z.string({ message: "Name must be string!" }),
    paymentStatus: z.enum(
      [paymentStatus.pending, paymentStatus.paid, paymentStatus.failed],
      { message: "Payment status must contain Pending | Paid | Failed!" },
    ).default("Pending"),
    status: z.enum(
      [bookingStatus.pending, bookingStatus.completed, bookingStatus.failed],
      { message: "Status is required!" },
    ).default("Pending"),
    totalPrice: z.number({ message: "Total price must be number!" }),
  }),
});

export const bookingValidationSchema = {
  createBooking,
};
