const request = require("supertest");
const app = require("../../app");
const db = require("../../models");

describe("Pattern pages", () => {
  test("GET /patterns", async () => {
    await request(app)
      .get("/patterns")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/New Pattern/);
        expect(response.text).toMatch(/Name/);
        expect(response.text).toMatch(/Color/);
        expect(response.text).toMatch(/Actions/);
      });
  });

  test("GET /patterns/new", async () => {
    await request(app)
      .get("/patterns/new")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/<input type="color"/);
        expect(response.text).toMatch(/Create/);
        expect(response.text).toMatch(/Cancel/);
        expect(response.text).toMatch(/Name/);
      });
  });

  test("POST /patterns", async () => {
    // POST a new pattern
    await request(app)
      .post("/patterns")
      .send({ name: "lavender", color: "#b7a5f1" })
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.headers["location"]).toBe("/patterns");
      });

    // GET patterns and see it
    await request(app)
      .get("/patterns")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/lavender/);
        expect(response.text).toMatch(/#b7a5f1/);
        expect(response.text).toMatch(/Delete/);
      });
  });

  test("DELETE /patterns", async () => {
    // Create a one-off pattern for the test
    await db.Pattern.create({
      name: "testpattern",
      color: "green"
    }).then(newPattern => {
      request(app)
        .delete(`/patterns/${newPattern.id}`)
        .then(response => {
          expect(response.statusCode).toBe(302);
          expect(response.headers["location"]).toBe("/patterns");
          expect(response.text).not.toMatch(/testpattern/);
          expect(response.text).not.toMatch(/green/);
        });
    });
  });
});
