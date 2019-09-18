var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../models');

// GET patterns
router.get('/', 
  function(req, res, next) {
    var patterns = db.Pattern.findAll()
      .then(patterns => {
        res.render('patterns/index', {
          patterns: patterns,
          moment: require('moment')
        });
      });
});

// GET new
router.get('/new', 
  function(req, res, next) {
  res.render('patterns/new', {
  });
});

// POST single owner
router.post('/', (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  db.Pattern.create({
    name: name,
    color: color
  })
    .then(newPattern => {
      res.redirect('/patterns');
    })
});

// DELETE single owner
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.Pattern.destroy({
    where: { id: id }
  })
    .then(deletedPattern => {
      res.redirect('/patterns');
    });
});

module.exports = router;



//   // PATCH single owner
//   app.patch('/owner/:id', (req, res) => {
//     const id = req.params.id;
//     const updates = req.body.updates;
//     db.owners.find({
//       where: { id: id }
//     })
//       .then(owner => {
//         return owner.updateAttributes(updates)
//       })
//       .then(updatedOwner => {
//         res.json(updatedOwner);
//       });
//   });




