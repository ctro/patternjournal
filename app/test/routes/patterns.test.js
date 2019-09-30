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

  test("POST /patterns with errors", async () => {
    // POST a new pattern
    await request(app)
      .post("/patterns")
      .send({
        name: "",
        color: ""
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Name can't be empty/);
        expect(response.text).toMatch(/Color can't be empty/);
      });

  });

  // EDIT
  test("GET /patterns/id does not work for wrong User", async () => {
    return db.Pattern.create(
      {
        name: "mandarin",
        color: "orange",
        User: {
          googleId: "orange-g-id",
          name: "Scrooge McDuck",
          email: "d@d.d",
          imageUrl: "duck.jpg"
        }
      },
      {
        include: [db.User]
      }
    )
      .then(pattern => {
        expect(pattern.name).toEqual("mandarin");
        expect(pattern.User.googleId).toEqual("orange-g-id");

        // return the pattern.
        return pattern;
      })
      .then(pattern => {
        request(app)
          .get(`/patterns/edit/${pattern.id}`)
          .then(response => {
            expect(response.statusCode).toBe(404);
          });
      });
  });

  test("GET /patterns/id works for User", async () => {
    return db.Pattern.create({
      name: "peas",
      color: "green",
      UserId: 1
    })
      .then(pattern => {
        expect(pattern.name).toEqual("peas");

        // return the pattern.
        return pattern;
      })
      .then(pattern => {
        request(app)
          .get(`/patterns/edit/${pattern.id}`)
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toMatch(/method="POST"/);
            expect(response.text).toMatch(/value="peas"/);
            expect(response.text).toMatch(/value="green"/);
          });
      });
  });

  // UPDATE
  test("UPDATE /patterns/id 404s for wrong User", async () => {
    return db.Pattern.create(
      {
        name: "squash",
        color: "yellow",
        User: {
          googleId: "yellow-g-id",
          name: "Summer Squash",
          email: "s@s.s",
          imageUrl: "squash.jpg"
        }
      },
      {
        include: [db.User]
      }
    )
      .then(pattern => {
        expect(pattern.name).toEqual("squash");

        // return the pattern.
        return pattern;
      })
      .then(pattern => {
        request(app)
          .post(`/patterns/update${pattern.id}`)
          .send({
            name: "zucchini",
            color: "green"
          })
          .then(response => {
            expect(response.statusCode).toBe(404);
          });
      });
  });

  test("UPDATE /patterns/id works for User", async () => {
    return db.Pattern.create({
      name: "twix",
      color: "brown",
      UserId: 1
    })
      .then(pattern => {
        expect(pattern.name).toEqual("twix");

        // return the pattern.
        return pattern;
      })
      .then(pattern => {
        request(app)
          .post(`/patterns/update/${pattern.id}`)
          .send({
            name: "snickers",
            color: "ochre"
          })
          .then(response => {
            expect(response.statusCode).toBe(302);
            expect(response.headers["location"]).toBe("/patterns");

            return "ok";
          })
          .then(msg => {
            request(app)
              .get("/patterns")
              .then(response => {
                expect(response.text).toMatch(/snickers/);
                expect(response.text).toMatch(/ochre/);
                expect(response.text).not.toMatch(/twix/);
                expect(response.text).not.toMatch(/brown/);
              });
          });
      });
  });

  test("DELETE /patterns works and obeys UserId", async () => {
    // Create a one-off pattern for the test
    await db.Pattern.create({
      name: "testpattern",
      color: "green",
      UserId: 1
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
          return db.Pattern.findAll({ where: { id: newPattern.id } });
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
          return db.Pattern.findAll({ where: { id: newPattern.id } });
        })
        .then(patterns => {
          expect(patterns.length).toEqual(1);
        });
    });
  });
});
