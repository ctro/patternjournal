var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', 
  function(req, res, next) {
  // pass vars to the front
  res.render('index', { yourname: 'ctro' });
});

router.get('/logout', function(req, res) {
  req.logout();
  req.session = null;
  res.send({ message: 'Successful logout'});
});

module.exports = router;
