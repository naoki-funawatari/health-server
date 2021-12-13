import express, { Request, Response } from "express";
import path from "path";
import { readFileSync } from "fs";

const filePath = path.join("db", "master", "holidays.json");
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  const buffer = readFileSync(filePath);
  const json = JSON.parse(buffer.toString()) as {
    id: number;
    date: string;
    name: string;
  }[];

  res.send(json);
});

export default router;
