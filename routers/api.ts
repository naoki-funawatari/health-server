import express from "express";
const path = require("path");
const router = express.Router();

router.use("/v1", require(path.join(__dirname, "api", "v1")));

module.exports = router;
