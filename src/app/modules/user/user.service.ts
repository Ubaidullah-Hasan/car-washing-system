/* eslint-disable no-console */
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};

export const userServices = {
  createUserIntoDB,
};
