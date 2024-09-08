import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { ServiceModel } from "../service/service.model";
import { UserModel } from "../user/user.model";
import { SlotModel } from "../slot/slot.model";
import { createPayment } from "../payment/payment_utils";
import { slotStatus } from "../slot/slot.constant";

const createBookingIntoDB = async (payload: TBooking, userEmail: string) => {
  const service = await ServiceModel.findById(payload?.serviceId);
  const slot = await SlotModel.findById(payload?.slotId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  const customer = await UserModel.findOne({ email: userEmail });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

  const transactionId = 'TNX-' + Date.now();


  const bookingCreate = await BookingModel.create({
    ...payload,
    transactionId
  });

  if (bookingCreate) {
    await SlotModel.findOneAndUpdate(
      { _id: payload.slotId },
      { isBooked: slotStatus.booked },
      { new: true }
    )
  }

  const paymentInfo = {
    amount: payload.totalPrice,
    tran_id: transactionId,
    cus_name: payload.customer,
    cus_email: userEmail,
    cus_phone: payload.phone,
  }
  const result = createPayment(paymentInfo);


  return result;
};

const getAllBookingFromDB = async () => {
  const bookings = await BookingModel.find().sort({ createdAt: -1 })
    .populate("customer")
    .populate("serviceId")
    .populate("slotId");

  return bookings;
};

const getMyBookingFromDB = async (userEmail: string) => {
  const user = await UserModel.findOne({ email: userEmail });
  const userId = user?.id;

  const bookings = await BookingModel.find({ customer: userId })
    .populate("customer")
    .populate("serviceId")
    .populate("slotId");

  return bookings;
};






export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
