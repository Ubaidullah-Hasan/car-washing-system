import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidationSchema } from "./service.validation";
import { serviceController } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { slotValidationSchema } from "../slot/slot.validation";
import { slotController } from "../slot/slot.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(serviceValidationSchema.createService),
  serviceController.createService,
);
router.get("/offers", serviceController.getOfferServices);
router.get("/bestsale", serviceController.getBestServices);
router.get("/popular", serviceController.getPopularServices);
// hop! /:id must be below /ofers, bestsale because /:id is dynamic
router.get("/:id", serviceController.getSingleService);
router.get("/", serviceController.getAllService);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(serviceValidationSchema.updateService),
  serviceController.updateService,
);

router.delete("/:id", auth(USER_ROLE.admin), serviceController.deleteService);

router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(slotValidationSchema.createSlot),
  slotController.createSlot,
);

export const servicRoute = router;
