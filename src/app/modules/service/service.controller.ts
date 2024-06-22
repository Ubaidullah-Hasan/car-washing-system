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

const getSingleService = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const result = await sserviceServices.getSingleServiceFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
});

const getAllService = catchAsync(async (req, res, next) => {
    const result = await sserviceServices.getAllServiceFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
    });
});

export const serviceController = {
    createService,
    getSingleService,
    getAllService
}