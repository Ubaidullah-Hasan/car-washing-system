import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    address: { type: String, required: true }
});

// Create and export Mongoose model
export const UserModel = model<TUser>('User', UserSchema);