const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const test_helpers = require("../test-helpers");

beforeAll(() => {
  return request(app).get("/login").then(response => {
    expect(response.statusCode).toBe(302);
  });
}); 

// Test day routes

describe("/ the root path", () => {
  test("Can get a protected path", async () => {

    await request(app)
      .get("/day")
      .then(response => {
        expect(response.statusCode).toBe(200);
        //expect(response.statusCode).toBe(302);
      });
  });
});
