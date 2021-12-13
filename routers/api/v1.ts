import express from "express";
import conditions from "./v1/conditions";
import employees from "./v1/employees";
import holidays from "./v1/holidays";
import reports from "./v1/reports";

const router = express.Router();
router.use("/conditions", conditions);
router.use("/employees", employees);
router.use("/holidays", holidays);
router.use("/reports", reports);

export default router;
