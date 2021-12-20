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
        ORDER BY date, id
      `;
      const results = await client.query<IHolidays>({ text });
      res.status(200).json(results.rows);
      client.release();
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const { date, name }: { date: string; name: string } = req.body;

    try {
      const client = await pool.connect();
      let text = `
        INSERT INTO holidays (date, name)
        VALUES ($1, $2)
      `;
      let values = [date, name];
      await client.query({ text, values });

      text = `
        SELECT id, to_char(date, 'YYYY/MM/DD') as date, name
        FROM holidays 
        ORDER BY date, id
      `;
      const results = await client.query<IHolidays>({ text });
      res.status(200).json(results.rows);
      client.release();
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const client = await pool.connect();
      let text = `DELETE FROM holidays WHERE id = $1`;
      let values = [id];
      await client.query({ text, values });

      text = `
        SELECT id, to_char(date, 'YYYY/MM/DD') as date, name
        FROM holidays
        ORDER BY date, id
      `;
      const results = await client.query<IHolidays>({ text });
      res.status(200).json(results.rows);
      client.release();
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  });

export default router;
