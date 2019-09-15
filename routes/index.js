const express = require("express");
const router = express.Router();
const passport = require("passport");
const helpers = require("../helpers");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { user: req.user });
});

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"]
  }),
  function(req, res, next) {
    // If authenticate function does not redirect, ball back to here.
    //  this happens in with mock-passport. 
    res.redirect("/");
  }
);

router.get(
  "/loggedin",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
