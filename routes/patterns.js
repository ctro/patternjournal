var express = require("express");
var router = express.Router();
var db = require("../models");

// GET index
router.get("/", function(req, res, next) {
  db.Pattern.findAll({
    where: { UserId: req.user.id },
    order: [['createdAt', 'ASC']]
  }).then(patterns => {
    res.render("patterns/index", {
      patterns: patterns,
      moment: require("moment")
    });
  });
});

// GET new
router.get("/new", function(req, res, next) {
  res.render("patterns/new", {});
});

// POST create
router.post("/", (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  db.Pattern.create({
    name: name,
    color: color,
    // 🔮 This user is from the session
    UserId: req.user.id
  }).then(newPattern => {
    res.redirect("/patterns");
  });
});

// GET edit
router.get("/edit/:id", function(req, res, next) {
  db.Pattern.findAll({
    where: { id: req.params.id, UserId: req.user.id }
  }).then(patterns => {
    if (patterns[0]) res.render("patterns/edit", { editPattern: patterns[0] });
    else {
      res.status(404);
      res.render("404");
    }
  });
});

// POST single pattern
router.post("/update/:id", (req, res) => {
  db.Pattern.findAll({
    where: { id: req.params.id, UserId: req.user.id }
  })
    .then(patterns => {
      var pattern = patterns[0];
      if (pattern) {
        return pattern.update({
          name: req.body.name,
          color: req.body.color
        });
      } else {
        res.status(404);
        res.render("404");
      }
    })
    .then(updatedPattern => {
      res.redirect("/patterns");
    });
});

// DELETE single pattern
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.Pattern.destroy({
    where: {
      id: id,
      UserId: req.user.id
    }
  }).then(deletedPattern => {
    res.redirect("/patterns");
  });
});

module.exports = router;
