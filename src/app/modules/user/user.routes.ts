import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = Router();

router.post(
    "/signup",
    validateRequest(userValidationSchema.createUser),
    userController.createUser
);

export const userRoutes = router;