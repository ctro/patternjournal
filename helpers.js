// Put random helpers here
module.exports = {

  // Helper middleware to enforce auth and set `user` local
  isAuthd: function(req, res, next) {
    if (req.user) {
      res.locals.user = req.user;
      return next();
    }
    // Not logged in
    res.redirect('/');
  }
  
}