import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";

export const router = Router();
const modulesRoutes = [
    {
        path: "/auth",
        route: userRoutes,
    },
];

modulesRoutes.forEach((route) =>
    router.use(route.path, route.route)
);
