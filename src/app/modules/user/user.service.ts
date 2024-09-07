/* eslint-disable no-console */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TUpdateInfo, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken } from "./user.utils";
import { USER_ROLE } from "./user.constant";

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

const getUserByEmailFromDB = async (email: string) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  return user;
}

const getAllUserFromDB = async () => {
  const user = await UserModel.find({ role: "user" })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No User found!");
  }
  return user;
}

const updateUserRole = async (userId: string, role: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No User found!");
  }
  if (user.role === USER_ROLE.user) {
    const result = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    return result;
  } else {
    throw new AppError(httpStatus.FORBIDDEN, "Role update not allowed!");
  }
}

const updateProfileIntoDB = async (payload: TUpdateInfo, userEmail: string) => {
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update the user's profile information
  user.name = payload.name || user.name;
  user.phone = payload.phone || user.phone;
  user.address = payload.address || user.address;

  // Save the updated user profile
  const result = await user.save();
  return result;
}

export const userServices = {
  createUserIntoDB,
  loginUser,
  getUserByEmailFromDB,
  getAllUserFromDB,
  updateUserRole,
  updateProfileIntoDB
};
