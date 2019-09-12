const request = require("supertest");
const app = require("../../app");
var db = require("../../models");

// Test day routes

describe("/ the root path", () => {
  test("Can get a protected path", async () => {
    await request(app).get("/days")
      .then(response => expect(response.statusCode).toBe(200))
  });
});
