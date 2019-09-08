var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../models');

// GET patterns
router.get('/', 
  function(req, res, next) {
    var patterns = db.Pattern.findAll()
      .then(patterns => {
        res.json(patterns);
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
      res.json(newPattern);
    })
});

// GET one pattern by id
// router.get('/pattern/:id', (req, res) => {
//   const id = req.params.id;
//   db.owners.find({
//     where: { id: id }
//   })
//     .then(pattern => {
//       res.json(pattern);
//     });
// });


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

//   // DELETE single owner
//   app.delete('/owner/:id', (req, res) => {
//     const id = req.params.id;
//     db.owners.destroy({
//       where: { id: id }
//     })
//       .then(deletedOwner => {
//         res.json(deletedOwner);
//       });
//   });
// };


