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
    isPopular: { type: Boolean, default: false },
    isBestSale: { type: Boolean, default: false },
    offer: {
      type: Number,
      default: 0, // Default no offer
      validate: {
        validator: function (value: number) {
          return value >= 0 && value <= 100;
        },
        message: "Offer must be between 0 and 100",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Create the Mongoose model
export const ServiceModel = model<TService>("Service", ServiceSchema);
