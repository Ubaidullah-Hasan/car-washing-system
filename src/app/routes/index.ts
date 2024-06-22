import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { servicRoute } from "../modules/service/service.routes";

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
