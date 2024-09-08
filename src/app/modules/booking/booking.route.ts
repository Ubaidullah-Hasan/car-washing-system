import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(bookingValidationSchema.createBooking),
  bookingController.createBooking,
);
router.get("/", auth(USER_ROLE.admin), bookingController.getAllBookings);

router.get(
  "/my-bookings/:userEmail",
  auth(USER_ROLE.user),
  bookingController.getMyBookings,
);


export const bookingRoutes = router;
