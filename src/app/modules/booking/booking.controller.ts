/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.services";
import { Request, Response } from "express";

const createBooking = catchAsync(async (req, res, next) => {
  const result = await bookingServices.createBookingIntoDB(
    req?.body,
    req?.user?.email,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successfull!",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await bookingServices.getAllBookingFromDB();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res, next) => {
  const { userEmail } = req.params;
  const result = await bookingServices.getMyBookingFromDB(userEmail);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings
};
