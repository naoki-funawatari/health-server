import express from "express";
const path = require("path");
const router = express.Router();

router.use("/conditions", require(path.join(__dirname, "v1", "conditions")));
router.use("/employees", require(path.join(__dirname, "v1", "employees")));
router.use("/holidays", require(path.join(__dirname, "v1", "holidays")));
router.use("/reports", require(path.join(__dirname, "v1", "reports")));
router.use("/report", require(path.join(__dirname, "v1", "report")));

module.exports = router;
