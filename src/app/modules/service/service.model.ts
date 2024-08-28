import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const ServiceSchema = new Schema<TService>(
  {
    name: { type: String, required: true, unique: true },
    image: { 
      type: String,
      default: ""
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Create the Mongoose model
export const ServiceModel = model<TService>("Service", ServiceSchema);
