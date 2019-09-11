var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var dotenv = require("dotenv");
var session = require("express-session");
var db = require("./models");
var helpers = require("./helpers");

var indexRouter = require("./routes/index");
var patternsRouter = require("./routes/patterns");
var dayRouter = require("./routes/day");

//Load dotenv
dotenv.config();

// Auth Setup
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.G_AUTH_CLIENT_ID,
      clientSecret: process.env.G_AUTH_CLIENT_SECRET,
      callbackURL: process.env.G_AUTH_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
      db.User.findOrCreate({
        where: { googleId: profile.id },
        defaults: { 
          name: profile.displayName,
          email: profile.emails[0].value,
          imageUrl: profile.photos[0].value
        }
      }).then(([user, created]) => {
        return cb(false, user);
      });
    }
  )
);

// Serialize our PK into the session, and find by it.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(obj, cb) {
  db.User.findByPk(obj).then(user => {
    cb(null, user);
  })
});

// 🎉 our app!
var app = express();

// Our own helpers
app.use(helpers.addToday);

// Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// HTTP verb overrides
app.use(methodOverride("_method"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/", indexRouter);
app.use("/patterns", helpers.isAuthd, patternsRouter);
app.use("/day", helpers.isAuthd, dayRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(res.render("404"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
