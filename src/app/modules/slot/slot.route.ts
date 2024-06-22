import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { slotValidationSchema } from "./slot.validation";
import { slotController } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/',
    auth(USER_ROLE.admin),
    validateRequest(slotValidationSchema.createSlot),
    slotController.createSlot
)

export const slotRoutes = router;