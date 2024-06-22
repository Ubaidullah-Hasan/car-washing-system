/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.services";

const createBooking = catchAsync(async (req, res, next) => {
    const result = await bookingServices.createBookingIntoDB(req?.body, req?.user?.email);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking successful",
        data: result,
    });
});

export const bookingController = {
    createBooking,
}