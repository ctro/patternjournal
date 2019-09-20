const request = require("supertest");
const app = require("../../app");

describe("Day pages", () => {
  test("GET /day", async () => {
    await request(app)
      .get("/day")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Day index/);
      });
  });

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
});
