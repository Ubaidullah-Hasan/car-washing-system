import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model"

const createOrUpdateReviewIntoDB = async (data: TReview) => {
    const result = ReviewModel.findOneAndUpdate(
        {userId: data.userId},
        {$set: data},
        {upsert: true}
    )
    return result;
}

const getAllReviewFromDB = async () => {
    const reviews = await ReviewModel.find().sort({ date: -1 }).limit(2).populate("userId");
    return reviews;
}

const getSingleReviewFromDB = async (userId: string) => {
    const reviews = await ReviewModel.findOne({userId});
    return reviews;
}


export const reviewServices = {
    createOrUpdateReviewIntoDB,
    getAllReviewFromDB,
    getSingleReviewFromDB
}