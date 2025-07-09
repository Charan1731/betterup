import express from "express";
import websiteRouter from "./routes/website.routes";
import cors from "cors";

const app = express();

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json())

app.use("/api/v1/websites", websiteRouter);

app.listen(8080, () => {
    console.log(`server running on port http://localhost:8080`)
})