var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', 
  function(req, res, next) {
  // pass vars to the front
  res.render('index', { yourname: 'ctro' });
});

router.get('/login',
  function(req, res, next) {
  res.render('login');
});

router.get('/loggedin',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    //res.redirect('/');
    next();
  });

router.get('/logout', function(req, res) {
  console.log("logged out!");
  req.logout();
  req.session = null;
  res.redirect('/');
});

module.exports = router;
