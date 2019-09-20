var db = require("../../models");

describe("Pattern model", () => {
  test("Pattern CRUD and relationships", async () => {
    return db.Pattern.create(
      {
        name: "bananas",
        color: "yellow",
        User: {
          googleId: "yellow-g-id",
          name: "Big Bird",
          email: "b@b.b",
          imageUrl: "bird.jpg"
        }
      },
      {
        include: [db.User]
      }
    ).then(pattern => {
      expect(pattern.name).toEqual("bananas");
      expect(pattern.color).toEqual("yellow");

      expect(pattern.User.name).toEqual("Big Bird");
      expect(pattern.User.googleId).toEqual("yellow-g-id");
      expect(pattern.User.email).toEqual("b@b.b");
      expect(pattern.User.imageUrl).toEqual("bird.jpg");

      // return the user patterns.
      return pattern.User.getPatterns();
    }).then(patterns => {
      expect(patterns.length).toEqual(1);
      expect(patterns[0].name).toEqual("bananas");
      expect(patterns[0].color).toEqual("yellow");
    });
  });
});
