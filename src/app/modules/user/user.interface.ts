import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

type UserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  address: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModelInterface extends Model<TUser> {
  isUserExistByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatch(plainTextPas: string, hashedPass: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTime: Date,
    JWTIssuedTime: number,
  ): boolean;
}

export type TLoginUser = {
  email: string;
  password: string;
};
