import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema.createUser),
  userController.createUser,
);

router.post(
  "/login",
  validateRequest(userValidationSchema.loginValidationSchema),
  userController.loginUser,
);
router.get(
  "/:email",
  userController.getUserByEmail,
);

router.get(
  "/",
  userController.getAllUser,
);

router.patch(
  "/role/:userId",
  validateRequest(userValidationSchema.userRoleUpdateValidationSchema),
  userController.updateUserRole,
);

export const userRoutes = router;
