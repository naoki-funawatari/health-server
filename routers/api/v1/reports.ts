import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
const router = express.Router();
const filePath = path.join("db", "records", "reports.json");

interface IReport {
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

router
  .get("/", (req: Request, res: Response) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

    const { year, month } = req.query;
    const buffer = fs.readFileSync(filePath);
    const json = (JSON.parse(buffer.toString()) as IReport[])
      .map(addKyeDate)
      .filter(o => Number(o.keyDate.format("YYYY")) === Number(year))
      .filter(o => Number(o.keyDate.format("M")) === Number(month));

    res.send(json);
  })
  .post("/", (req: Request, res: Response) => {
    const newReports = (req.body as IReport[]).map(addKyeDate);
    const buffer = fs.readFileSync(filePath);
    const json = (JSON.parse(buffer.toString()) as IReport[])
      .map(addKyeDate)
      .map(report => {
        const newReport = newReports
          .filter(o => o.employee_id === report.employee_id)
          .filter(o => o.keyDate.isSame(report.keyDate))[0];
        if (newReport) {
          Object.assign(report, newReport);
        }
        return report;
      })
      .map(o => ({
        employee_id: o.employee_id,
        date: o.date,
        condition_id: o.condition_id,
        reason: o.reason,
      }));

    fs.writeFileSync(filePath, JSON.stringify(json));
    res.send(json);
  });

module.exports = router;
