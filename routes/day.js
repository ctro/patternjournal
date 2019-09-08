var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../models');

// GET patterns
router.get('/', 
  function(req, res, next) {
    res.send("Day index!")
});

/* GET pattern page. */
router.get('/:year?/:month?/:day?', 
  passport.authenticate('basic', { session: false }),
  function(req, res, next) {
  // pass vars to the front
  res.render('day/day', {
    year: req.params.year,
    month: req.params.month,
    day: req.params.day
  });
});

module.exports = router;
