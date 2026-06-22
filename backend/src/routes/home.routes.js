import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const homeRouter = Router();

homeRouter.get("/", authMiddleware.authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Home fetched"
    });
});

export default homeRouter;