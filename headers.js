const pkg = require("./package.json");

module.exports = (req, res, next) => {
  res.setHeader("X-App-Version", pkg.version);
  res.setHeader("X-Powered-By", "NodeJS & Coffee.");
  res.setHeader("X-Website", "etrukavina.com/dns/");
  res.setHeader("X-Author", "E.T.Rukavina");
  res.setHeader("X-Git", "github.com/etrukavina.com/dns");
  next();
};
