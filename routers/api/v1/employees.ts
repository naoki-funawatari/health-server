import express, { Request, Response } from "express";
const path = require("path");
const fs = require("fs");
const router = express.Router();
const filePath = path.join("db", "master", "employees.json");

router.get("/", (req: Request, res: Response) => {
  const json = JSON.parse(fs.readFileSync(filePath)) as {
    id: number;
    bu: string;
    ka: string;
    no: string;
    rank: string;
    name: string;
  }[];
  res.send(json);
});

module.exports = router;
