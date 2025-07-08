import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { addWebsite, getWebsiteStatus } from "../controllers/website.controller";

const websiteRouter = Router();
websiteRouter.post("/website",authMiddleware, addWebsite)

websiteRouter.get('/website/status',authMiddleware, getWebsiteStatus)

websiteRouter.get("/websites",authMiddleware, async (req, res) => {
    
})

websiteRouter.delete('/website',authMiddleware, (req, res) => {

})

export default websiteRouter;