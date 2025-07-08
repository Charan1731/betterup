import express from "express";
import websiteRouter from "./routes/website.routes";

const app = express();

app.use(express.json())

app.use("/api/v1/websites", websiteRouter);

app.listen(3000, () => {
    console.log(`server running on port http://localhost:3000`)
})