/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { slotServices } from "./slot.services";

const createSlot = catchAsync(async (req, res, next) => {
  const result = await slotServices.createSlotIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res, next) => {
  const {servicesId} = req.params;
  const result = await slotServices.getAvailableSlotsByServiceId(req?.query, servicesId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

const getSingleAvailableSlotsById = catchAsync(async (req, res, next) => {
  const {slotId} = req.params;
  const result = await slotServices.getAvailableSlotsById(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots,
  getSingleAvailableSlotsById,
};
