import express, { Request, Response } from "express";
import { pool } from "../../../db/pool";

interface IHolidays {
  id: number;
  date: string;
  name: string;
}

const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const results = await client.query<IHolidays>("SELECT * FROM holidays");
    res.status(200).json(results.rows);
  } catch (ex) {
    console.log(ex);
    res.status(400);
  }
});

export default router;
