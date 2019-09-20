var db = require("../../models");
var test_helpers = require("../test_helpers.js");

describe("User model", () => {
  test("Can create one user, login style", async () => {
    return db.User.doLogin(test_helpers.testProfile).then(user => {
      expect(user.name).toEqual("Mr. McTesterson");
      expect(user.googleId).toEqual("--a-fake-google-id--");
      expect(user.email).toEqual("test@test.com");
      expect(user.imageUrl).toMatch(/cat-profile.png/);
    });
  });

  test("CRUD and relationships", async () => {
    return db.User.create({
      googleId: "test-g-id",
      name: "UserTest",
      email: "t@t.t",
      imageUrl: "img.jpg"
    }).then(user => {
      expect(user.name).toEqual("UserTest");
      expect(user.email).toEqual("t@t.t");
      expect(user.imageUrl).toEqual("img.jpg");
    });
  });
});
