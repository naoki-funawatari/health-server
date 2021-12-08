import express, { Request, Response } from "express";
const path = require("path");
const fs = require("fs");
const router = express.Router();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const filePath = path.join("db", "records", "reports.json");

router.get("/", (req: Request, res: Response) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

  const { year, month } = req.query;
  console.time("dayjs");
  const json = (
    JSON.parse(fs.readFileSync(filePath)) as {
      employee_id: number;
      condition_id: number;
      date: string;
      reason: string;
    }[]
  )
    .map(o => ({
      ...o,
      keyDate: dayjs(o.date).tz(),
    }))
    .filter(o => Number(o.keyDate.format("YYYY")) === Number(year))
    .filter(o => Number(o.keyDate.format("M")) === Number(month));
  console.timeEnd("dayjs");

  res.send(json);
});

module.exports = router;
