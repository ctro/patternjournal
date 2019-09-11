var express = require("express");
var router = express.Router();
var db = require("../models");
var moment = require("moment");

// GET patterns
router.get("/", function(req, res, next) {
  res.send("Day index!");
});

/* GET pattern page. */
router.get("/:year?/:month?/:day?", function(req, res, next) {
  // Make a friendly date
  var mDate = moment(
    new Date(req.params.year, req.params.month - 1, req.params.day)
  );
  var mYesterday = mDate.subtract(1, "day");
  var mTomorrow = mDate.add(1, "day");

  // pass shortcuts to req.params values
  res.render("day/day", {
    formattedDate: mDate.format("lll"),
    ydayLink: mYesterday.format("YYYY/MM/DD"),
    tmrwLink: mTomorrow.format("YYYY/MM/DD"),
    year: req.params.year,
    month: req.params.month,
    day: req.params.day
  });
});

module.exports = router;
