import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    address: { type: String, required: true },
},
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.salt_round));
    next();
});

UserSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

// Create and export Mongoose model
export const UserModel = model<TUser>("User", UserSchema);
