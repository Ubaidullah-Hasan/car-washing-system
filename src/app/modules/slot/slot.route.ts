import { Router } from "express";
import { slotController } from "./slot.controller";

const router = Router();

router.get("/:servicesId", slotController.getAvailableSlots);

export const slotRoutes = router;
