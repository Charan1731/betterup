
import { Router } from "express";
import { getValidatorDetails } from "../controllers/validator.controller";

const router = Router();

router.get("/:publicKey", async (req, res, next) => {
  try {
    await getValidatorDetails(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
