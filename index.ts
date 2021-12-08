import express, { Request, Response } from "express";
const cors = require("cors");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use("/api", require(path.join(__dirname, "routers", "api")));
app.listen(3001, () => console.log("Listening on port 3001"));
