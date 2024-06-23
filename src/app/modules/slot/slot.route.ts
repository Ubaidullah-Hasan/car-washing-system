import { Router } from "express";
import { slotController } from "./slot.controller";

const router = Router();

router.get("/availability", slotController.getAvailableSlots);

export const slotRoutes = router;
