import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import route from "./route/userRouter.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {

    res.send("this is root route");

});

app.use("/api", route);

export default app;