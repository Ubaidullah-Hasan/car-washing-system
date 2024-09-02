import { TReviewQuery } from "./review.controller";
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model"

const createOrUpdateReviewIntoDB = async (data: TReview) => {
    const result = ReviewModel.findOneAndUpdate(
        { userId: data.userId },
        { $set: data },
        { upsert: true }
    )
    return result;
}

const getAllReviewFromDB = async (query: TReviewQuery) => {
    const { date, limit } = query;

    let reviews;
    if (date && limit) {
        reviews = await ReviewModel.find().sort({ date: -1 }).limit(limit).populate("userId");
    } else {
        reviews = await ReviewModel.find().sort({ date: -1 }).populate("userId");
    }

    const result = await ReviewModel.aggregate(
        [
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" }
                }
            }
        ]
    )
    const averageRating = result.length > 0 ? result[0].avgRating : null;

    

    return { reviews, averageRating };
}

const getSingleReviewFromDB = async (userId: string) => {
    const reviews = await ReviewModel.findOne({ userId }, { rating: 1, feedback: 1 });
    return reviews;
}


export const reviewServices = {
    createOrUpdateReviewIntoDB,
    getAllReviewFromDB,
    getSingleReviewFromDB
}