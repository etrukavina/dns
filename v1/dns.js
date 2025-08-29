const express = require("express");
const dns = require("dns").promises;

const router = express.Router();

router.get("/:type/:domain", async (req, res) => {
  const { domain, type } = req.params;

  try {
    let records;

    switch (type.toUpperCase()) {
      case "A":
        records = (await dns.resolve4(domain)).map(r => ({ type: "A", value: r }));
        break;
      case "AAAA":
        records = (await dns.resolve6(domain)).map(r => ({ type: "AAAA", value: r }));
        break;
      case "CNAME":
        records = (await dns.resolveCname(domain)).map(r => ({ type: "CNAME", value: r }));
        break;
      case "MX":
        records = (await dns.resolveMx(domain)).map(r => ({ type: "MX", exchange: r.exchange, priority: r.priority }));
        break;
      case "TXT":
        records = (await dns.resolveTxt(domain)).map(r => ({ type: "TXT", value: r.join("") }));
        break;
      case "NS":
        records = (await dns.resolveNs(domain)).map(r => ({ type: "NS", value: r }));
        break;
      case "SRV":
        records = (await dns.resolveSrv(domain)).map(r => ({
          type: "SRV",
          name: r.name,
          port: r.port,
          priority: r.priority,
          weight: r.weight,
        }));
        break;
      case "PTR":
        records = (await dns.resolvePtr(domain)).map(r => ({ type: "PTR", value: r }));
        break;
      case "SOA":
        const soa = await dns.resolveSoa(domain);
        records = [{ type: "SOA", ...soa }];
        break;
      case "NAPTR":
        records = (await dns.resolveNaptr(domain)).map(r => ({
          type: "NAPTR",
          order: r.order,
          preference: r.preference,
          flags: r.flags,
          service: r.service,
          regexp: r.regexp,
          replacement: r.replacement,
        }));
        break;
      case "HINFO":
        const hinfo = await dns.resolveHinfo(domain);
        records = hinfo.map(r => ({ type: "HINFO", cpu: r[0], os: r[1] }));
        break;
      case "SPF":
        records = (await dns.resolveSpf(domain)).map(r => ({ type: "SPF", value: r }));
        break;
      case "ANY":
        records = (await dns.resolveAny(domain)).map(r => ({ type: r.type, value: r }));
        break;
      default:
        return res.status(400).json({ error: "Unsupported record type" });
    }

    res.json({ domain, type, records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
