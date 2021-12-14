import express, { Request, Response } from "express";
import { pool } from "../../../db/pool";

interface IConditions {
  id: number;
  name: string;
}

const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const results = await client.query<IConditions>("SELECT * FROM conditions");
    res.status(200).json(results.rows);
  } catch (ex) {
    console.log(ex);
    res.status(400);
  }
});

export default router;
