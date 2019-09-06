var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', 
  passport.authenticate('basic', { session: false }),
  function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logout', function(req, res) {
  req.logout();
  req.session = null;
  res.send({ message: 'Successful logout'});
});

module.exports = router;
