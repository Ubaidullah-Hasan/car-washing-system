/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { serviceServices } from "./service.service";

const createService = catchAsync(async (req, res, next) => {
    const result = await serviceServices.createServiceIntoDB(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service created successfully",
        data: result,
    });
});

const getSingleService = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await serviceServices.getSingleServiceFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
});

const getAllService = catchAsync(async (req, res, next) => {
    const result = await serviceServices.getAllServiceFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
    });
});

const updateService = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await serviceServices.updateServiceIntoDB(id, req?.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result,
    });
});

export const serviceController = {
    createService,
    getSingleService,
    getAllService,
    updateService,
}