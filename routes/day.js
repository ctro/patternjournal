var express = require("express");
var router = express.Router();
var moment = require("moment");
var helpers = require("../helpers");

// GET patterns
router.get("/", function(req, res, next) {
  res.render("day/index");
});

/* GET pattern page. */
router.get("/:year?/:month?/:day?", function(req, res, next) {
  // Make a friendly date
  var mDate = moment(
    helpers.pjDate(req.params.year, req.params.month, req.params.day)
  );
  var mYesterday = moment(mDate).subtract(1, "days");
  var mTomorrow = moment(mDate).add(1, "days");

  // pass shortcuts to req.params values
  res.render("day/day", {
    formattedDate: mDate.format("dddd, MMMM Do YYYY"),
    ydayLink: mYesterday.format("YYYY/MM/DD"),
    tmrwLink: mTomorrow.format("YYYY/MM/DD"),
    year: req.params.year,
    month: req.params.month,
    day: req.params.day
  });
});

module.exports = router;
