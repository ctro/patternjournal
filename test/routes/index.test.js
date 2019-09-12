const request = require("supertest");
const app = require("../../app");
var db = require("../../models");

// Test index router routes and other general things like 404

describe("/ the root path", () => {
  test("GET / with lots of sanity checks", async () => {
    await request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.charset).toBe("utf-8");
        expect(response.type).toBe("text/html");
        expect(response.clientError).toBe(false);
        expect(response.serverError).toBe(false);
        expect(response.error).toBe(false);
        expect(response.text).toMatch(/Pattern Journal/);
      });
  });
});

describe("Google OAuth Login", () => {
  //our Auth happens via Google
  test("GET /login redirects to Google", async () => {
    await request(app)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(302); //redirect
        expect(response.headers["location"]).toMatch(
          /https:\/\/accounts.google.com/
        );
      });
  });

  // this is the OAuth callback, which does the same auth
  // handled behind the scenes by Passport
  test("GET /loggedin redirects to Google", async () => {
    await request(app)
      .get("/loggedin")
      .then(response => {
        expect(response.statusCode).toBe(302); //redirect
        expect(response.headers["location"]).toMatch(
          /https:\/\/accounts.google.com/
        );
      });
  });
});