const request = require("supertest");
const app = require("../../app");
const db = require("../../models");

describe("Day pages", () => {
  test("GET /day/<date>", async () => {
    await request(app)
      .get("/day/2020/04/20")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Monday April 20th 2020/);

        // check yesterday/tomorrow links
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/19">Last Day/);
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/21">Next Day/);
      });
  });

  test("/day/<date> with Patterns, and Increment Counters", async () => {
    // Create a couple Patterns
    // this works because the initial fake user has id 1.
    var pattern1 = await db.Pattern.create({
      name: "grass",
      color: "green",
      UserId: 1
    });
    await db.Pattern.create({ name: "roses", color: "red", UserId: 1 });
    await db.Pattern.create({ name: "dandelion", color: "yellow" }); //NO UserId
    // GET The day page and make sure patterns are there.
    await request(app)
      .get("/day/2020/04/20")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Monday April 20th 2020/);

        // check yesterday/tomorrow links
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/19">Last Day/);
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/21">Next Day/);
        expect(response.text).toMatch(/grass/);
        expect(response.text).toMatch(/roses/);
        expect(response.text).not.toMatch(/dandelion/);
      });

    // POST to increment a counter
    await request(app)
      .post("/day/incrementPatternCounter")
      .send({
        year: "2020",
        month: "04",
        day: "20",
        patternId: pattern1.id
      })
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.headers["location"]).toBe("/day/2020/04/20");
      });

      // GET the day page again and verify counts.
      await request(app)
      .get("/day/2020/04/20")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Monday April 20th 2020/);

        // check yesterday/tomorrow links
        expect(response.text).toMatch(/grass: 1/);
        expect(response.text).toMatch(/roses: 0/);
      });
  });
});
