
import { Router } from "express";
import { addValidator, getValidatorDetails } from "../controllers/validator.controller";

const router = Router();

router.get("/:publicKey", async (req, res, next) => {
  try {
    await getValidatorDetails(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/validator", async (req, res, next) => {
  try {
    await addValidator(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
