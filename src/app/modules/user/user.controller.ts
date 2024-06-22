/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

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
        message: 'User is logged in successfully',
        token: result.accessToken,
        data: result.user,
    });
})

export const userController = {
    createUser,
    loginUser
};
