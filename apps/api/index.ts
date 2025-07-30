import express from "express";
import websiteRouter from "./routes/website.routes";
import validatorRouter from "./routes/validator.routes";
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
app.use("/api/v1/validator", validatorRouter);

app.get('/', (req,res) => {
    res.send("Hello world");
})

app.listen(8080, () => {
    console.log(`server running on port http://localhost:8080`)
})