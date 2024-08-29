import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model"

const createReviewIntoDB = async (data: TReview) => {
    const result = ReviewModel.create(data);
    return result;
}

const getAllReviewFromDB = async () => {
    const reviews = await ReviewModel.find().sort({ date: -1 }).limit(2);
    return reviews;
}

export const reviewServices = {
    createReviewIntoDB,
    getAllReviewFromDB,
}