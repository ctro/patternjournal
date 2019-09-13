var db = require("../../models");
var test_helpers = require("../test-helpers.js");

describe("User model", () => {
  test("Can create one user, login style", async () => {
    

    return db.User.doLogin(test_helpers.testProfile)
      .then(([user, created]) => {
        expect(created).toEqual(true);
        expect(user.name).toEqual("Mr. McTesterson");
        expect(user.googleId).toEqual("--a-fake-google-id--");
        expect(user.email).toEqual("test@test.com");
        expect(user.imageUrl).toEqual("http://img.com/img.jpg");
      });
  });
});
