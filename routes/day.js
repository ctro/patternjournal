const express = require("express");
const router = express.Router();
const moment = require("moment");
const helpers = require("../helpers");
const db = require("../models");

/* GET pattern page. */
router.get("/:year?/:month?/:day?", function(req, res, next) {
  // Make a friendly date
  var mDate = moment(
    helpers.pjDate(req.params.year, req.params.month, req.params.day)
  );
  var mYesterday = moment(mDate).subtract(1, "days");
  var mTomorrow = moment(mDate).add(1, "days");

  db.Pattern.findAll({
    where: { UserId: req.user.id },
    order: [["createdAt", "ASC"]]
  }).then(patterns => {
    // pass shortcuts to req.params values
    res.render("day/day", {
      formattedDate: mDate.format("dddd, MMMM Do YYYY"),
      ydayLink: mYesterday.format("YYYY/MM/DD"),
      tmrwLink: mTomorrow.format("YYYY/MM/DD"),
      year: req.params.year,
      month: req.params.month,
      day: req.params.day,
      patterns: patterns
    });
  });
});

module.exports = router;
