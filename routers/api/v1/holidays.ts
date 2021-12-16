import express, { Request, Response } from "express";
import { pool } from "../../../index";
import { IHolidays } from "../../../interfaces/interfaces";

const router = express.Router();
router
  .get("/", async (req: Request, res: Response) => {
    try {
      const client = await pool.connect();
      const text = `
        SELECT id, to_char(date, 'YYYY/MM/DD') as date, name
        FROM holidays
        ORDER BY date
      `;
      const results = await client.query<IHolidays>({ text });
      res.status(200).json(results.rows);
      client.release();
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  })
  .get("/:year", async (req: Request, res: Response) => {
    const { year } = req.params;

    try {
      const client = await pool.connect();
      const text = `
        SELECT id, to_char(date, 'YYYY/MM/DD') as date, name
        FROM holidays
        WHERE to_char(date, 'YYYY') = $1
        ORDER BY date
      `;
      const values = [year];
      const results = await client.query<IHolidays>({ text, values });
      res.status(200).json(results.rows);
      client.release();
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  })
  .get("/:year/:month", async (req: Request, res: Response) => {
    const { year, month } = req.params;

    try {
      const client = await pool.connect();
      const text = `
        SELECT id, to_char(date, 'YYYY/MM/DD') as date, name
        FROM holidays
        WHERE to_char(date, 'YYYY') = $1
          AND to_char(date, 'MM')   = $2
        ORDER BY date
      `;
      const values = [year, month];
      const results = await client.query<IHolidays>({ text, values });
      res.status(200).json(results.rows);
      client.release();
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  });

export default router;
