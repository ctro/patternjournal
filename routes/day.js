var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport')

// GET patterns
router.get('/', 
  function(req, res, next) {
    res.send("Day index!")
});

/* GET pattern page. */
router.get('/:year?/:month?/:day?',
  passport.authenticate('google', { scope: ['profile'] }),
  function(req, res, next) {
  // pass vars to the front
  res.render('day/day', {
    year: req.params.year,
    month: req.params.month,
    day: req.params.day
  });
});

module.exports = router;
