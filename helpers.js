// Put random helpers here
module.exports = {
  // Middleware to enforce auth and set `user` local
  isAuthd: function(req, res, next) {
    // console.log("🎇🎇🎇ISAUTHD?:" + req.user);
    if (req.user) {
      res.locals.user = req.user;
      
      return next();
    }
    // Not logged in
    console.log("🛑 Is Not Authd!")
    res.redirect("/");
  },

  // Middleware to add today.year, month, and day
  addToday: function(req, res, next) {
    // console.log("🎇🎇ADDTODAY:");
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    res.locals.today = { year: year, month: month, day: day };
    return next();
  }
};
