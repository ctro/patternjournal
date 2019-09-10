var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', 
  function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/login',
  passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));

router.get('/loggedin',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  console.log("logged out!");
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
