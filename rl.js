const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 60, // 60 requests / min
});
