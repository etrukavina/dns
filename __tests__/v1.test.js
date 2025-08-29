const request = require("supertest");
const app = require("../service");

describe("E.T.Rukavina DNS v1", () => {
  it("GET /health should return ok status", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });

  it("GET /reverse/8.8.8.8 should return PTR records", async () => {
    const res = await request(app).get("/v1/reverse/8.8.8.8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ip", "8.8.8.8");
    expect(Array.isArray(res.body.records)).toBe(true);
  });

  it("GET /A/google.com should return A records", async () => {
    const res = await request(app).get("/v1/A/google.com");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("domain", "google.com");
    expect(res.body).toHaveProperty("type", "A");
    expect(Array.isArray(res.body.records)).toBe(true);
  });

  it("GET /XYZ/example.com should return 400 for invalid type", async () => {
    const res = await request(app).get("/v1/XYZ/example.com");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
