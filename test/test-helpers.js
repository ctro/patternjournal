const db = require("../models");
// Test Helpers
module.exports = {
  // ONLY USE THIS IN TEST ENV -- it bypasses auth as the user below
  // Helper middleware to enforce auth and set `user` local
  // fakeAuth: function(req, res, next) {
  //   db.User.doLogin(testProfile).then(([user, created]) => {
  //     //console.log(user);
  //     req.user = user;
  //     res.locals.user = user;
  //     console.log("🎇🎇🎇FAKEIT:" + req.user.name);
  //   });

  //   return next();
  // },

  // Helper function to do a login with the fake profile below
  // doFakeLogin: async function() {
  //   [user, created] = await db.User.doLogin(testProfile);
  //   console.log("🤥Fake login " + user.googleId);
  //   return user;
  // }
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
