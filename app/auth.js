const db = require("./models");

module.exports = {
 passportSetup: function(app) {
    // development, production envs
    const passport = require("passport");
    const googleStrategy = require("passport-google-oauth20").Strategy;
    passport.use(
      new googleStrategy(
        {
          clientID: process.env.G_AUTH_CLIENT_ID,
          clientSecret: process.env.G_AUTH_CLIENT_SECRET,
          callbackURL: process.env.G_AUTH_CALLBACK
        },
        function(accessToken, refreshToken, profile, cb) {
          db.User.doLogin(profile).then(user => {
            return cb(false, user);
          });
        }
      )
    );
    // Serialize our PK into the session, and find by it.
    passport.serializeUser(function(user, cb) {
      console.log("🥣🥣🥣SERIALIZE THIS" + JSON.stringify(user));
      cb(null, user.id);
    });
    passport.deserializeUser(function(obj, cb) {
      db.User.findByPk(obj).then(user => {
        cb(null, user);
      });
    });

    // More passport configuration
    app.use(passport.initialize());
    app.use(passport.session());
  }
};
