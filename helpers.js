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

  // 📸 🎇FLASH🎇
  // Flash messages Middleware via the session
  flash: function(req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    if (req.session) {
      res.locals.flashMessage = req.session.flashMessage;
      delete req.session.flashMessage;
      res.locals.flashMotivation = req.session.flashMotivation;
      delete req.session.flashMotivation;
    }
    return next();
  },

  // Middleware to add today.year, month, and day
  addToday: function(req, res, next) {
    // Date is always UTC on server.
    var dateObj = new Date();

    // HACK: everyone is mountain time now!
    dateObj.setHours(dateObj.getHours() - 6);

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
