import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { ServiceModel } from "../service/service.model";
import { UserModel } from "../user/user.model";

const createBookingIntoDB = async (payload: TBooking, userEmail: string) => {
    const service = await ServiceModel.findById(payload?.serviceId)
    const slot = await ServiceModel.findById(payload?.slotId)

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }

    if (!slot) {
        throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
    }

    const user = await UserModel.findOne({ email: userEmail });

    const result = await BookingModel.create({
        ...payload,
        customer: user?._id
    });

    const booking = await BookingModel.findById(result?._id)
        .populate("customer")
        .populate("service")
        .populate("slot")

    return booking;
};

export const bookingServices = {
    createBookingIntoDB,
}
