import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { servicRoute } from "../modules/service/service.routes";
import { slotRoutes } from "../modules/slot/slot.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import { reviewRoutes } from "../modules/review/review.route";

export const router = Router();
const modulesRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/services",
    route: servicRoute,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
