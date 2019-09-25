const request = require("supertest");
const app = require("../../app");
const db = require("../../models");

describe("Day pages", () => {

  test("GET /day/<date>", async () => {
    await request(app)
      .get("/day/2020/04/20")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Monday, April 20th 2020/);

        // check yesterday/tomorrow links
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/19">Yesterday/);
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/21">Tomorrow/);
      });
  });

  test("GET /day/<date> with User patterns", async () => {
    // this works because the initial fake user has id 1.
    await db.Pattern.create({ name: "grass", color: "green", UserId: 1 });
    await db.Pattern.create({ name: "roses", color: "red", UserId: 1 });
    await db.Pattern.create({ name: "dandelion", color: "yellow" });
    await request(app)
      .get("/day/2020/04/20")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Monday, April 20th 2020/);

        // check yesterday/tomorrow links
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/19">Yesterday/);
        expect(response.text).toMatch(/a href="\/day\/2020\/04\/21">Tomorrow/);
        expect(response.text).toMatch(/grass/);
        expect(response.text).toMatch(/roses/);
        expect(response.text).not.toMatch(/dandelion/);
      });
  });
});
