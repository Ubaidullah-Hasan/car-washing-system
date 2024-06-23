/* eslint-disable no-console */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken } from "./user.utils";

const createUserIntoDB = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistByCustomEmail(payload?.email);

  // check if user is exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  // // checking the password is corrent
  if (!(await UserModel?.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong password!");
  }

  // // Access Granted : Send AccessToken
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expire_in as string,
  );

  user.password = "";

  return {
    accessToken,
    user,
  };
};

export const userServices = {
  createUserIntoDB,
  loginUser,
};
