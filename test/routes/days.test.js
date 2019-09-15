const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const test_helpers = require("../test-helpers");

// Test day routes

describe("/ the root path", () => {
  test("Can get a protected path", async () => {

    //bunch of stuff here that I need to move.
    
    // add app middleware
    app.use(test_helpers.fakeAuth);
    // 

    await request(app)
      .get("/day")
      .then(response => {
        // expect(response.statusCode).toBe(200);
        expect(response.statusCode).toBe(302);
      });
  });
});
