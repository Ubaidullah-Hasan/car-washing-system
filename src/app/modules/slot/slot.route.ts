import { Router } from "express";
import { slotController } from "./slot.controller";
import validateRequest from "../../middlewares/validateRequest";
import { slotValidationSchema } from "./slot.validation";

const router = Router();

router.get("/:servicesId", slotController.getAvailableSlots);
router.get("/selectedSlot/:slotId", slotController.getSingleAvailableSlotsById);
router.get("/", slotController.getAllSlot);
router.post("/", validateRequest(slotValidationSchema.createSlot), slotController.createSlot);
router.patch(
    "/status/:slotId",
    validateRequest(slotValidationSchema.updateSlotStatus),
    slotController.changeSlotStatus
);


export const slotRoutes = router;
