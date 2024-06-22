import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { servicRoute } from "../modules/service/service.routes";
import { slotRoutes } from "../modules/slot/slot.route";

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
    path: "/services/slots",
    route: slotRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
