import express, { Request, Response } from "express";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { pool } from "../../../db/pool";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

interface IReport {
  id: number;
  employee_id: number;
  date: string;
  condition_id: number;
  reason: string;
  keyDate: Dayjs;
}

const addKyeDate = (report: IReport) => ({
  ...report,
  keyDate: dayjs(report.date).tz(),
});

const router = express.Router();
router
  .get("/", async (req: Request, res: Response) => {
    const { year, month } = req.query;
    try {
      const client = await pool.connect();
      const text = `
        SELECT id, employee_id, to_char(date, 'YYYY/MM/DD') as date, condition_id, reason
        FROM reports
        WHERE to_char(date, 'YYYY') = $1
          AND to_char(date, 'MM')   = $2
      `;
      const values = [year, month];
      const results = await client.query<IReport>({
        text,
        values,
      });
      res.status(200).json(results.rows);
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const newReports = req.body as IReport[];
    const { year, month } = req.query;

    try {
      const client = await pool.connect();

      console.time("DELETE");
      newReports.forEach(async o => {
        const text = `DELETE FROM reports WHERE id = $1`;
        const values = [o.id];
        await client.query({ text, values });
      });
      console.timeEnd("DELETE");

      console.time("INSERT");
      newReports.forEach(async o => {
        const text = `INSERT INTO reports (
          employee_id,
          date,
          condition_id,
          reason
        ) VALUES (
          $1, $2, $3, $4
        )`;
        const values = [o.employee_id, o.date, o.condition_id, o.reason];
        await client.query({ text, values });
      });
      console.timeEnd("INSERT");

      console.time("SELECT");
      const text = `
        SELECT id, employee_id, to_char(date, 'YYYY/MM/DD') as date, condition_id, reason
        FROM reports
        WHERE to_char(date, 'YYYY') = $1
          AND to_char(date, 'MM')   = $2
      `;
      const values = [year, month];
      const results = await client.query<IReport>({
        text,
        values,
      });
      res.status(200).json(results.rows);
      console.timeEnd("SELECT");
    } catch (ex) {
      console.log(ex);
      res.status(400);
    }
  });

export default router;
