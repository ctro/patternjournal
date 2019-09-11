const request = require("supertest");
const app = require("../app");

// Test index router routes and other general things like 404

describe("Test the root path", () => {
  test("It should respond to the GET method", async () => {
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