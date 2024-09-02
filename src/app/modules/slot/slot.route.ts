import { Router } from "express";
import { slotController } from "./slot.controller";

const router = Router();

router.get("/:servicesId", slotController.getAvailableSlots);
router.get("/selectedSlot/:slotId", slotController.getSingleAvailableSlotsById);

export const slotRoutes = router;
