var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var dotenv = require("dotenv");
var session = require("express-session");
var db = require("./models");
var helpers = require("./helpers");
var test_helpers = require("./test/test-helpers");

//Load dotenv
dotenv.config();

// 🔒🔒🔒Passport Auth Setup 🔒🔒🔒
var passport = require("passport");

if (process.env["NODE_ENV=TEST"]) {
  //🚨🚨🚨 Watch out we dupe auth in the test env here.
  db.User.doLogin(test_helpers.testProfile).then(fakeUser => {
    console.log("🤥 Fake login for " + fakeUser.name);
    const MockStrategy = require("passport-mock-strategy");
    passport.use(
      new MockStrategy({
        name: "google", // so mocky
        user: fakeUser
      })
    );
  });
  //🚨🚨🚨
} else {
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
}

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
// 🔒🔒🔒 END Passport Auth Setup 🔒🔒🔒

// 🐣🎉 our app!
var app = express();

// 🤷‍ these were all generated and seem fine.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// Our custom middleware
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

// More passport configuration
app.use(passport.initialize());
app.use(passport.session());

// HTTP verb overrides
app.use(methodOverride("_method"));

// Pug view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routing
const indexRouter = require("./routes/index");
const patternsRouter = require("./routes/patterns");
const dayRouter = require("./routes/day");
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
