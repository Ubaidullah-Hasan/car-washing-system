import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidationSchema } from "./review.validation";
import { reviewController } from "./review.controller";

const router = Router();

router.patch(
    "/",
    auth(USER_ROLE.user),
    validateRequest(reviewValidationSchema.createReview),
    reviewController.createOrUpdateReview,
);

router.get("/", reviewController.getAllReview);

router.get(
    "/:userId",
    auth(USER_ROLE.user),
    reviewController.getSingleReview
);


export const reviewRoutes = router;
