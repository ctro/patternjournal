// Put random helpers here
module.exports = {
  // A test profile that matches what we get from Google OAuth
  // User model knows how to consume this.
  add: function(a,b) {
    return(a+b);
  }
};

var testProfile = {
  id: "--a-fake-google-id--",
  displayName: "Mr. McTesterson",
  emails: [{ value: "test@test.com" }],
  photos: [{ value: "http://img.com/img.jpg" }]
};
module.exports.testProfile = testProfile;

