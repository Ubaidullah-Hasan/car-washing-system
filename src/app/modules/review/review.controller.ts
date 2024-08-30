/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.services";

const createReview = catchAsync(async (req, res, next) => {
    const review = req.body;
    console.log(review);

    const result = await reviewServices.createReviewIntoDB(review);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review successfully created!",
        data: result,
    });
});

const getAllReview = catchAsync(async (req, res, next) => {
    const result = await reviewServices.getAllReviewFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All reviews retrieved successfully",
        data: result,
    });
});

export const reviewController = {
    createReview,
    getAllReview
}