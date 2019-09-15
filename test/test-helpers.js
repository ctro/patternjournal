const db = require("../models");
// Test Helpers
module.exports = {
  //functions go here
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
