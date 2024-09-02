import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { ServiceModel } from "../service/service.model";
import { UserModel } from "../user/user.model";
import { SlotModel } from "../slot/slot.model";

const createBookingIntoDB = async (payload: TBooking, userEmail: string) => {
  const service = await ServiceModel.findById(payload?.serviceId);
  let slot = await SlotModel.findById(payload?.slotId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  const user = await UserModel.findOne({ email: userEmail });

  const result = await BookingModel.create({
    ...payload,
    customer: user?._id,
  });

  if (result) {
    await SlotModel.findByIdAndUpdate(
      payload.slotId,
      { isBooked: 'booked' }, 
      { new: true } 
    );
  }

  return result;
};

const getAllBookingFromDB = async () => {
  const bookings = await BookingModel.find()
    .populate("customer")
    .populate("serviceId")
    .populate("slotId");

  return bookings;
};

const getMyBookingFromDB = async (userEmail: string) => {
  const user = await UserModel.findOne({ email: userEmail });
  const userId = user?.id;

  const bookings = await BookingModel.find({ customer: userId })
    .populate("serviceId")
    .populate("slotId");

  return bookings;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
