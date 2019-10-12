const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const session = require("cookie-session"); // Secure Cookies, no backing store.
const helpers = require("./helpers");
const helmet = require("helmet");

//Load dotenv
dotenv.config();

// 🐣🎉 our app!
const app = express();

// ⛑ Be safe.
app.use(helmet());

// 🤷‍ these were all generated and seem fine.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// Session - Secure Cookie
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "patternjournal.app",
      path: "/",
      expires: expiryDate
    }
  })
);

// Our custom middleware
app.use(helpers.addToday);
app.use(helpers.flash);

// 🔒🔒🔒 Passport Auth Setup 🔒🔒🔒
if (process.env.NODE_ENV == "test") {
  //🚨🚨🚨 Watch out we dupe auth in the test env here.
  //  Set the NO_FAKE_AUTH env variable as above to NOT do this in test env
  const test_helpers = require("./test/test_helpers");
  app.use(test_helpers.doFakeAuth);
  //🚨🚨🚨
} else {
  const auth = require("./auth.js");
  auth.passportSetup(app);
}
// 🔒🔒🔒 END Passport Auth Setup 🔒🔒🔒

// HTTP verb overrides
app.use(methodOverride("_method"));

// Pug view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routing
const patternsRouter = require("./routes/patterns");
const dayRouter = require("./routes/day");
const indexRouter = require("./routes/index");
app.use("/patterns", helpers.isAuthd, patternsRouter);
app.use("/day", helpers.isAuthd, dayRouter);
app.use("/", indexRouter);

// catch 404 and render
app.use(function(req, res, next) {
  res.status(404);
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
