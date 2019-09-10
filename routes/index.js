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
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  req.session = null;
  res.send({ message: 'Successful logout'});
});

module.exports = router;
