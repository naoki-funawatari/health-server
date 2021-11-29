const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const filePath = path.join("db", "master", "employees.json");

router.get("/", (req, res) => {
  const json = JSON.parse(fs.readFileSync(filePath));
  res.send(json);
});

module.exports = router;
