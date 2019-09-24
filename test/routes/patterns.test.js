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

  test("GET /patterns for a User", async () => {
    // this works because the initial fake user has id 1.
    await db.Pattern.create({ name: "apples", color: "red", UserId: 1 });
    await db.Pattern.create({ name: "peaches", color: "peach", UserId: 1 });
    await db.Pattern.create({ name: "grapes", color: "purple" });

    await request(app)
      .get("/patterns")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/peaches/);
        expect(response.text).toMatch(/apples/);
        expect(response.text).not.toMatch(/grapes/);
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
      .send({
        name: "lavender",
        color: "#b7a5f1"
      })
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

    // Test finder after the POST and check user association
    await db.Pattern.findAll({
      where: {
        name: "lavender"
      },
      include: [db.User]
    }).then(patterns => {
      expect(patterns).not.toBeUndefined;
      expect(patterns[0].name).toEqual("lavender");
      expect(patterns[0].User).not.toBeUndefined();
      expect(patterns[0].User.name).toEqual("Mr. McTesterson");
      expect(patterns[0].User.email).toEqual("test@test.com");
      expect(patterns[0].User.imageUrl).toMatch("cat"); //🐱
    });
  });

  test("DELETE /patterns works and obeys UserId", async () => {
    // Create a one-off pattern for the test
    await db.Pattern.create({
      name: "testpattern",
      color: "green",
      UserId:1 
    }).then(newPattern => {
      expect(newPattern.color).toEqual("green");
      request(app)
        .delete(`/patterns/${newPattern.id}`)
        .then(response => {
          expect(response.statusCode).toBe(302);
          expect(response.headers["location"]).toBe("/patterns");
          expect(response.text).not.toMatch(/testpattern/);
          expect(response.text).not.toMatch(/green/);

          // Verify that the Pattern was indeed deleted from the DB
          return db.Pattern.findAll({where: {id: newPattern.id}});

        })
        .then(patterns => {
          expect(patterns.length).toEqual(0);
          
        });
    });
  });

  test("DELETE /patterns does not work for the wrong user", async () => {
    // Create a one-off pattern for the test
    await db.Pattern.create({
      name: "drink bubbles",
      color: "pink",
      User: {
        googleId: "not-the-user-that-will-make-requests",
        name: "Mr. Selzer",
        email: "sparkle.com",
        imageUrl: "waterloo.jpg"
      }              
    }).then(newPattern => {
      expect(newPattern.color).toEqual("pink");
      request(app)
        .delete(`/patterns/${newPattern.id}`)
        .then(response => {
          expect(response.statusCode).toBe(302);
          expect(response.headers["location"]).toBe("/patterns");
          expect(response.text).not.toMatch(/drink bubbles/);
          expect(response.text).not.toMatch(/pink/);

          // Verify that the Pattern was NOT deleted from the DB
          return db.Pattern.findAll({where: {id: newPattern.id}});

        })
        .then(patterns => {
          expect(patterns.length).toEqual(1);
          
        });
    });
  });

});
