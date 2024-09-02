import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ServiceModel } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";
import { generateTimeSlots } from "./utils";

const createSlotIntoDB = async (payload: TSlot) => {
  const isServiceExist = await ServiceModel.findById(payload?.service);

  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found!");
  }
  if (isServiceExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is deleted!");
  }

  const startTime = payload?.startTime;
  const endTime = payload?.endTime;
  const serviceDuration = isServiceExist?.duration; // minutes

  // Generate time slots
  const timeSlots = generateTimeSlots(startTime, endTime, serviceDuration);

  // Create each slot sequentially
  const createdSlot = [];
  for (const slot of timeSlots) {
    const slotPayload: TSlot = {
      service: payload?.service,
      date: payload?.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    // Save slot in database
    const result = await SlotModel.create(slotPayload);
    createdSlot.push(result);
  }

  return createdSlot;
};

const getAvailableSlotsByServiceId = async (query: Record<string, unknown>, serviceId: string) => {
  const { date } = query;

  // const queryObj: Record<string, unknown> = { isBooked: "available" };
  const queryObj: Record<string, unknown> = {};

  if (date) {
    queryObj.date = date;
  }

  if (serviceId) {
    queryObj.service = serviceId;
  }

  const slots = await SlotModel.find(queryObj).populate("service");

  return slots;
};

const getAvailableSlotsById = async (slotId: string) => {

  const slots = await SlotModel.findById(slotId).populate("service");
  return slots;
};

export const slotServices = {
  createSlotIntoDB,
  getAvailableSlotsByServiceId,
  getAvailableSlotsById,
};
