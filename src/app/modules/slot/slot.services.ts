import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ServiceModel } from "../service/service.model"
import { TSlot } from "./slot.interface"
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
    const serviceDuration = 60; // minutes

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
            isBooked: payload?.isBooked, 
        };

        // Save slot in database
        const result = await SlotModel.create(slotPayload);
        createdSlot.push(result);
    }

    return createdSlot;
}

export const slotServices = {
    createSlotIntoDB,

}