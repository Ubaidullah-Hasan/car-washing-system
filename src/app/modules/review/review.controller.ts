/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.services";

const createOrUpdateReview = catchAsync(async (req, res, next) => {
    const review = req.body;

    const result = await reviewServices.createOrUpdateReviewIntoDB(review);

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
    createOrUpdateReview,
    getAllReview
}