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

//🚨🚨🚨 Watch out we dupe auth in the test env here.
db.User.doLogin(test_helpers.testProfile).then(fakeUser => {
  const MockStrategy = require("passport-mock-strategy");
  passport.use(
    new MockStrategy(
      {
        name: "google", // so mocky
        user: fakeUser //{ "id":40,"name":"Mr. McTesterson","googleId":"--a-fake-google-id--","email":"test@test.com","imageUrl":"http://img.com/img.jpg","createdAt":"2019-09-13T15:37:56.522Z","updatedAt":"2019-09-13T15:37:56.522Z" }
      }
      // (user, done) => {
        //   //   // Perform actions on user, call done once finished
        // console.log("🥓🥓🥓User " + JSON.stringify(user));
        //   //   // let u2 = null;
        //   //   // user = test_helpers.doFakeLogin().then(user => {
        //   //   //   u2 = user;
        //   //   //   console.log("🥓🥓🥓U2 IN " + JSON.stringify(u2));
        //   //   //   done();
        //   //   // });
        //   //   // console.log("🥓🥓🥓User  OUT" + JSON.stringify(user));
        //   //   // console.log("🥓🥓🥓U2  OUT" + JSON.stringify(u2));
        //   //   return user = ` `;
        //user = db.User.doLogin(test_helpers.testProfile);
  
        // this is abusing promises, and surely a really bad idea.
        // user = JSON.stringify(user)["fulfillmentValue"];
        // console.log("🥓🥓🥓User " + JSON.stringify(user));
        // done();
      // }
    )
  );
});


//HEY DON'T CHANGE THIS SHIT IT STILL WORKS

// const googleStrategy = require("passport-google-oauth20").Strategy;
// passport.use(
//   new googleStrategy(
//     {
//       clientID: process.env.G_AUTH_CLIENT_ID,
//       clientSecret: process.env.G_AUTH_CLIENT_SECRET,
//       callbackURL: process.env.G_AUTH_CALLBACK
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       db.User.doLogin(profile).then(([user, created]) => {
//         return cb(false, user);
//       });
//     }
//   )
// );

//🚨🚨🚨

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

// 🤷‍ these were all generated
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
