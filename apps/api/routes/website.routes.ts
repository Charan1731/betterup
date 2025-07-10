import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { addWebsite, deleteWebsite, getWebsites, getWebsiteStatus } from "../controllers/website.controller";

const websiteRouter = Router();
websiteRouter.post("/website",authMiddleware, addWebsite)

websiteRouter.get('/website/status',authMiddleware, getWebsiteStatus)

websiteRouter.get("/website",authMiddleware, getWebsites)

websiteRouter.delete('/website/:id',authMiddleware, deleteWebsite)

export default websiteRouter;