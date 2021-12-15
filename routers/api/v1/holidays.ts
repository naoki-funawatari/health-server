import express, { Request, Response } from "express";
import { pool } from "../../../index";
import { IHolidays } from "../../../interfaces/interfaces";

const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const results = await client.query<IHolidays>("SELECT * FROM holidays");
    res.status(200).json(results.rows);
    client.release();
  } catch (ex) {
    console.log(ex);
    res.status(400);
  }
});

export default router;
