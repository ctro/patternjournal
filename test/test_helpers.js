const db = require("../models");
// Test Helpers
module.exports = {
  // Fake authentication middleware used in test env.
  doFakeAuth: function(req, res, next) {
    db.User.doLogin(testProfile).then(fakeUser => {
      console.log("🤥 Did fake login " + JSON.stringify(fakeUser));
      req.user = fakeUser;
      return next();
    });
  }
};

// A test profile that matches what we get from Google OAuth
// User model knows how to consume this.
var testProfile = {
  id: "--a-fake-google-id--",
  displayName: "Mr. McTesterson",
  emails: [{ value: "test@test.com" }],
  photos: [{ value: "http://lvh.me:3000/images/cat-profile.png" }]
};
module.exports.testProfile = testProfile;
