/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

/* eslint-disable no-console */
const createUser = catchAsync(async(req, res, next) => {
    const result = await userServices.createUserIntoDB(req?.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully signup and created!",
        data: result
    })
}) 

export const userController = {
    createUser,
}