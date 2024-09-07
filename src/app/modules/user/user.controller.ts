/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { Request, Response } from "express";

/* eslint-disable no-console */
const createUser = catchAsync(async (req, res, next) => {
  const result = await userServices.createUserIntoDB(req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully",
    token: result.accessToken,
    data: result.user,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await userServices.getUserByEmailFromDB(email);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });

})

const getAllUser = async (req: Request, res: Response) => {
  const users = await userServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: users,
  });
}
const updateUserRole = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(req.body);
  const { role } = req.body;
  const users = await userServices.updateUserRole(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully!",
    data: users,
  });
}

const updateProfile = async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  const { name, phone, address } = req.body;
  const updateInfo = { name, phone, address };
  const result = await userServices.updateProfileIntoDB(updateInfo, userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully!",
    data: result,
  });
}

export const userController = {
  createUser,
  loginUser,
  getUserByEmail,
  getAllUser,
  updateUserRole,
  updateProfile,
};
