import mongoose from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new mongoose.Schema<TReview>({
    userId: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const ReviewModel = mongoose.model<TReview>('Review', reviewSchema);
