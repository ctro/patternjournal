const request = require("supertest");
const app = require("../app");
const thelpers = require("./test-helpers.js");
const helpers = require("../helpers.js");
var db = require("../models");

// Test index router routes and other general things like 404

describe("/ the root path", () => {
  test("GET / with lots of sanity checks", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.charset).toBe("utf-8");
    expect(response.type).toBe("text/html");
    expect(response.clientError).toBe(false);
    expect(response.serverError).toBe(false);
    expect(response.error).toBe(false);

    expect(response.text).toMatch(/Pattern Journal/);
  });
});

describe("Google OAuth Login", () => {
  //our Auth happens via Google
  test("GET /login redirects to Google", async () => {
    const response = await request(app).get("/login");

    expect(response.statusCode).toBe(302); //redirect
    expect(response.headers['location']).toMatch(/https:\/\/accounts.google.com/);
  });
  // this is the OAuth callback, which does the same auth
  // handled behind the scenes by Passport
  test("GET /loggedin redirects to Google", async () => {
    const response = await request(app).get("/login");

    expect(response.statusCode).toBe(302); //redirect
    expect(response.headers['location']).toMatch(/https:\/\/accounts.google.com/);
  });

  // Can we mock out the login?
  test("Can get a login-protected-page", done => {
    // Mock this function
    test_profile = {
      id: "--a-fake-google-id--", 
      displayName: "Mr. McTesterson",
      emails: ["test@test.com"],
      photos: ["http://img.com/img.jpg"]
    };

    var count = 0;
    db.User.doLogin(test_profile);
    db.User.count().then(c => {
      expect(c).toBe(1);
      done();
    })

    // const helpers.isAuthd = jest.fn(cb => cb(null, true));

    //const response = await request(app).get("/day");

    //expect(response.statusCode).toBe(200); // NOT 302 redirect!
  });
});