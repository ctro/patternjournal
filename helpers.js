const db = require('./models');
const test_helpers = require('./test/test-helpers');

// Put random helpers here
module.exports = {
  // Middleware to enforce auth and set `user` local
  isAuthd: function(req, res, next) {
    if (req.user) {
      res.locals.user = req.user;
      console.log("🟢 Is Authd! " + JSON.stringify(req.user));
      return next();
    }
    // Not logged in
    console.log("🛑 Is Not Authd! " + JSON.stringify(req.user));
    res.redirect("/");
  },

  doFakeAuth: function(req, res, next) {
    db.User.doLogin(test_helpers.testProfile).then(fakeUser => {
      console.log("🤥 Did fake login " + JSON.stringify(fakeUser));
      req.user = fakeUser
      return next();
    });
  },

  // Middleware to add today.year, month, and day
  addToday: function(req, res, next) {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    res.locals.today = { year: year, month: month, day: day };
    return next();
  }
};
