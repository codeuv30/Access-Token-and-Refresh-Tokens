import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"

const authRouter = Router();

authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);
authRouter.get("/me", authMiddleware.authMiddleware, authController.getMe);

export default authRouter;