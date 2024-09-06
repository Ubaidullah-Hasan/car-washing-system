/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { slotServices } from "./slot.services";
import { Request, Response } from "express";

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
  const { servicesId } = req.params;
  const result = await slotServices.getAvailableSlotsByServiceId(req?.query, servicesId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

const getSingleAvailableSlotsById = catchAsync(async (req, res, next) => {
  const { slotId } = req.params;
  const result = await slotServices.getAvailableSlotsById(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: result,
  });
});

const getAllSlot = async (req: Request, res: Response) => {
  const slots = await slotServices.getAllSlotsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: slots,
  });
}

const changeSlotStatus = async (req: Request, res: Response) => {
  const { slotId } = req.params; 
  const { isBooked } = req.body;
  const slot = await slotServices.changeSlotStatusIntoDB(slotId, isBooked);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot status updated successfully",
    data: slot,
  });
}

export const slotController = {
  createSlot,
  getAvailableSlots,
  getSingleAvailableSlotsById,
  getAllSlot,
  changeSlotStatus,
};
