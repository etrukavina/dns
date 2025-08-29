#!/usr/bin/env node

const express = require("express");
const path = require("path");
const pkg = require("./package.json");

const headers = require("./headers");
const rateLimiter = require("./rl");

const healthRoute = require("./health");
const reverseV1 = require("./v1/reverse");
const dnsV1 = require("./v1/dns");

const helmet = require("helmet");

const PORT = process.env.PORT || 3000;

const app = express();

// ----------------------
// Security + Middleware
// ----------------------
app.use(helmet());
app.use(rateLimiter);
app.use(headers);

// ----------------------
// Root Redirect
// ----------------------
app.get("/", (req, res) => {
  res.redirect(301, "https://etrukavina.com/dns/");
});

// ----------------------
// Static files
// ----------------------
// Serve raw OpenAPI JSON
app.use("/v1/openapi", express.static(path.join(__dirname, "openapi-v1.json")));

// ----------------------
// Health route
// ----------------------
app.use("/health", healthRoute);

// ----------------------
// API Routes
// ----------------------
app.use("/v1/reverse", reverseV1);
app.use("/v1/", dnsV1);

// ----------------------
// Error handler
// ----------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ----------------------
// Start Server
// ----------------------
const server = app.listen(PORT, () => {
  console.log(`E.T.Rukavina DNS running on port ${PORT} (v${pkg.version})`);
});

// ----------------------
// Graceful shutdown
// ----------------------
process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
