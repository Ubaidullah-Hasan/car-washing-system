import { z } from "zod";

const createReview = z.object({
    body: z.object({
        userId: z.string({ message: 'User id is required!' }),
        feedback: z.string({ message: "Feedback is required!" }),
        rating: z.number({ message: "Rating is a number!" }),
    }),
});

export const reviewValidationSchema = {
    createReview,
};
