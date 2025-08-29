const express = require("express");
const dns = require("dns").promises;

const router = express.Router();

router.get("/:ip", async (req, res) => {
  const { ip } = req.params;
  try {
    const names = await dns.reverse(ip);
    const records = names.map(n => ({ type: "PTR", value: n }));
    res.json({ ip, records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
