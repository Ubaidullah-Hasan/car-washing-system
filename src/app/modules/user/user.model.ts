import { TUser, UserModelInterface } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Schema, model } from "mongoose";

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    address: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// statics for userExists
UserSchema.statics.isUserExistByCustomEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};

// statics for passwordMatch
UserSchema.statics.isPasswordMatch = async function (
  plainTextPas: string,
  hashedPass: string,
) {
  return await bcrypt.compare(plainTextPas, hashedPass);
};

// Create and export Mongoose model
export const UserModel = model<TUser, UserModelInterface>("User", UserSchema);
