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

export type TReviewQuery = { date: number, limit: number }

const getAllReview = catchAsync(async (req, res, next) => {
    const query = req.query;
    const queryType: TReviewQuery = {
        date: Number(query.date),
        limit: Number(query.limit)
    }
    const result = await reviewServices.getAllReviewFromDB(queryType);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All reviews retrieved successfully",
        data: result,
    });
});

const getSingleReview = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const result = await reviewServices.getSingleReviewFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Your reviews retrieved successfully",
        data: result,
    });
});

export const reviewController = {
    createOrUpdateReview,
    getAllReview,
    getSingleReview
}