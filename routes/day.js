const express = require("express");
const router = express.Router();
const moment = require("moment");
const helpers = require("../helpers");
const db = require("../models");

/* GET pattern page. */
router.get("/:year/:month/:day", function(req, res, next) {
  // Make a friendly date
  var jDate = helpers.pjDate(req.params.year, req.params.month, req.params.day)
  var mDate = moment(jDate);
  var mYesterday = moment(mDate).subtract(1, "days");
  var mTomorrow = moment(mDate).add(1, "days");

  return db.Pattern.findAll({
    where: { UserId: req.user.id },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: db.Day,
        where: { date: mDate },
        required: false
      }
    ]
  }).then(patterns => {
    db.Day.findOrCreate({
      where: { UserId: req.user.id, date: jDate }
    }).then(([day, created]) => {
      // pass shortcuts to req.params values
      res.render("day/day", {
        formattedDate: mDate.format("dddd MMMM Do YYYY"),
        mYesterday: mYesterday,
        mTomorrow: mTomorrow,
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
        patterns: patterns,
        sDay: day
      });
    });
  });
});

// POST Create or Increment PatternDay and .count
router.post("/incrementPatternCounter", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const patternId = req.body.patternId;

  // Start with the User's Pattern, it exists.
  return db.Pattern.findOne({
    where: { id: patternId, UserId: req.user.id }
  })
    .then(pattern => {
      // findOrCreate a Day
      return db.Day.findOrCreate({
        where: { UserId: req.user.id, date: helpers.pjDate(year, month, day) }
      });
    })
    .then(([theDay, created]) => {
      // findOrCreate a PatternDay
      return db.PatternDay.findOrCreate({
        where: { PatternId: patternId, DayId: theDay.id },
        defaults: {
          count: 0
        }
      });
    })
    .then(([thePatternDay, created]) => {
      // make a call to increment the count
      return db.PatternDay.increment("count", {
        where: {
          DayId: thePatternDay.DayId,
          PatternId: thePatternDay.PatternId
        }
      });
    })
    .then(thePatternDay => {
      res.redirect(`/day/${year}/${month}/${day}`);
    });
});

/* POST day note. */
router.post("/:year/:month/:day", function(req, res, next) {
  var dayDate = helpers.pjDate(
    req.params.year,
    req.params.month,
    req.params.day
  );

  return db.Day.findOrCreate({
    where: { date: dayDate, UserId: req.user.id }
  })
    .then(([day, created]) => {
      if (day) {
        return day.update({
          note: req.body.note
        });
      } else {
        res.status(404);
        res.render("404");
      }
    })
    .then(updatedDay => {
      res.redirect(
        `/day/${req.params.year}/${req.params.month}/${req.params.day}`
      );
    });
});

module.exports = router;
