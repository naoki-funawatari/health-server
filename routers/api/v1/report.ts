import express, { Request, Response } from "express";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
const router = express.Router();
const filePath = path.join("db", "records", "reports.json");

router.post("/", (req: Request, res: Response) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

  const newReport = req.query as {
    employee_id: string;
    condition_id: string;
    date: string;
    reason: string;
  };
  console.log(newReport);
  const buffer = readFileSync(filePath);
  console.log(buffer);
  const json = JSON.parse(buffer.toString()) as {
    employee_id: number;
    condition_id: number;
    date: string;
    reason: string;
  }[];

  // const searchDate = dayjs(newReport.date).tz();

  // const report = json
  //   .map(o => ({
  //     ...o,
  //     keyDate: dayjs(o.date).tz(),
  //   }))
  //   .find(o => o.keyDate.isSame(searchDate));
  // Object.assign(report, newReport);
  // console.timeEnd("dayjs");

  // writeFileSync(filePath, JSON.stringify(json));
});

module.exports = router;
