
import { Router } from "express";
import { getValidatorDetails } from "../controllers/validator.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/:publicKey", authMiddleware, getValidatorDetails);

export default router;
