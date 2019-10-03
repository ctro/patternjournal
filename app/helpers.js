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

  // Middleware to add today.year, month, and day
  addToday: function(req, res, next) {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    res.locals.today = { year: year, month: month, day: day };
    return next();
  },

  // Javascript Date uses 0-based month index, don't do that.
  pjDate: function(year, month, day) {
    return new Date(year, month - 1, day);
  }
};