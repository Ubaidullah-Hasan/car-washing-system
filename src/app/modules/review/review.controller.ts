/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.services";
import { ReviewModel } from "./review.model";

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

    if (result?.length === 0) {
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
        message: "All reviews retrieved successfully",
        data: result,
    });
});

export const reviewController = {
    createReview,
    getAllReview
}