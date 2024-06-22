import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidationSchema } from "./service.validation";
import { serviceController } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    "/",
    auth(USER_ROLE.admin),
    validateRequest(serviceValidationSchema.createService),
    serviceController.createService,
)

export const servicRoute = router;