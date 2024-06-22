import { Router } from "express";
import { slotController } from "./slot.controller";

const router = Router();

router.get('/',
    slotController.getAvailableSlots
)

export const slotRoutes = router;