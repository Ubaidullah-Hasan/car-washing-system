import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ServiceModel } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";
import { generateTimeSlots } from "./utils";
import { slotStatus } from "./slot.constant";

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

  const slot = await SlotModel.find({ date: payload.date, startTime: payload.startTime })

  if (slot.length !== 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "This time already booked.")
  }

  let result;
  if (timeSlots) {
    result = await SlotModel.create(payload);
  }
  return result;
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

const getAllSlotsFromDB = async () => {
  const result = await SlotModel.find().sort({ createdAt: -1 }).populate("service");
  return result;
}

const changeSlotStatusIntoDB = async (slotId: string, status: string) => {
  const slot = await SlotModel.findById(slotId);

  if (slot?.isBooked === slotStatus.booked) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is already booked!")
  }
  if (slot) {
    const updatedSlot = await SlotModel.findByIdAndUpdate(
      slotId,
      { isBooked: status },
      { new: true }
    );
    return updatedSlot;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found!")
  }
}



export const slotServices = {
  createSlotIntoDB,
  getAvailableSlotsByServiceId,
  getAvailableSlotsById,
  getAllSlotsFromDB,
  changeSlotStatusIntoDB,
};
