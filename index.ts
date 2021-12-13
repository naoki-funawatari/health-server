import express from "express";
import cors from "cors";
import api from "./routers/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use("/api", api);
app.listen(3001, () => console.log("Listening on port 3001"));
