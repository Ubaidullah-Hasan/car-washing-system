import { Schema } from "mongoose";

// TypeScript interface
export type TBooking = {
  customer?: Schema.Types.ObjectId;
  serviceId: Schema.Types.ObjectId;
  slotId: Schema.Types.ObjectId;
  vehicleType:
    | "car"
    | "truck"
    | "SUV"
    | "van"
    | "motorcycle"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor";
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  phone: string;
  name: string;
  paymentStatus: string;
  status: string;
  transactionId: string;
  totalPrice: number;
};
