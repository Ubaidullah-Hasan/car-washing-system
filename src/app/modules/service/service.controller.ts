/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sserviceServices } from "./service.service";
import sendResponse from "../../utils/sendResponse";

const createService = catchAsync(async (req, res, next) => {
    const result = await sserviceServices.createServiceIntoDB(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service created successfully",
        data: result,
    });
});

export const serviceController = {
    createService
}