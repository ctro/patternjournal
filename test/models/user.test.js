var db = require("../../models");

describe("User model", () => {
  test("Can create one user, login style", async () => {
    var test_profile = {
      id: "--a-fake-google-id--",
      displayName: "Mr. McTesterson",
      emails: ["test@test.com"],
      photos: ["http://img.com/img.jpg"]
    };

    return db.User.doLogin(test_profile).then(
      db.User.count().then(c => expect(c).toEqual(1))
    );
  });
});
