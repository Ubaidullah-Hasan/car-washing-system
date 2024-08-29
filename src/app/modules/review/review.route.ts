import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidationSchema } from "./review.validation";
import { reviewController } from "./review.controller";

const router = Router();

router.post(
    "/reviews",
    auth(USER_ROLE.user),
    validateRequest(reviewValidationSchema.createReview),
    reviewController.createReview,
);
router.get("/reviews", reviewController.getAllReview);


export const reviewRoutes = router;
