const express = require("express");
const pkg = require("./package.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "ok", version: pkg.version });
});

module.exports = router;
