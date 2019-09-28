var db = require("../../models");
var helpers = require("../../helpers");

// Kinda using this to test the "whole" datamodel relationship.

describe("PatternDay join", () => {
  test("Full datamodel relationship", async () => {
    // User -> 2 patterns -> 2 days = 4 patternDays
    //  the other model tests do combined creation. Use methods() here.

    // remember User, Patterns, and Days to use in later tests.
    var remUser = null;
    var remP1 = null;
    var remP2 = null;
    var remD1 = null;
    var remD2 = null;

    //Make a user
    return db.User.create({
      googleId: "mahnamahna",
      name: "Dr. Teeth",
      email: "HEY@JAZZ.YES",
      imageUrl: "teeth.gif"
    })
      .then(user => {
        remUser = user;
        expect(remUser.name).toEqual("Dr. Teeth");

        // OK now make a pattern
        return db.Pattern.create({
          name: "Shine the gold!",
          color: "gold",
          UserId: remUser.id
        });
      })
      .then(pattern1 => {
        remP1 = pattern1;
        expect(remP1.color).toEqual("gold");

        // And another Pattern
        return db.Pattern.create({
          name: "re-string my guitar, man",
          color: "silver",
          UserId: remUser.id
        });
      })
      .then(pattern2 => {
        remP2 = pattern2;
        expect(remP2.color).toEqual("silver");
        // expect(user.getPatterns().length).toEqual(2);

        // On one day he only shined his tooth, THREE TIMES
        return db.Day.create({
          date: helpers.pjDate(1978, 12, 17),
          note: "This was a really shiny tooth day"
        });
      })
      .then(day1 => {
        remD1 = day1;
        expect(remD1.date).toEqual("1978-12-17");

        return db.Day.create({
          date: helpers.pjDate(1978, 12, 18),
          note: "Today was double good"
        });
      })
      .then(day2 => {
        remD2 = day2;
        expect(remD2.date).toEqual("1978-12-18");

        // Now create relationship: Pattern1, Day1, three times.
        return remD1.addPattern(remP1, { through: { count: 3 } });
      })
      .then(patternDays => {
        // this is the count on the join table
        expect(patternDays[0].count).toEqual(3);
        return patternDays[0].getDay();
      })
      .then(day => {
        expect(day.date).toEqual(remD1.date);

        //Nice.  Now create another relationship
        //  adding one-at-a-time is fine, that's what the app will do.
        return remD2.addPattern(remP1, { through: { count: 2 } });
      })
      .then(patternDays => {
        expect(patternDays[0].count).toEqual(2);

        return remD2.addPattern(remP2, { through: { count: 7 } });
      })
      .then(patternDays => {
        expect(patternDays[0].count).toEqual(7);

        // Pretend you have a Day and a User, get all the patterns and counts.
        return remD2.getPatterns({
          where: { UserId: remUser.id },
          include: [db.Day]
        });
      })
      .then(patterns => {
        expect(patterns.length).toEqual(2);

        expect(patterns[0].color).toEqual("gold");
        expect(patterns[1].color).toEqual("silver");
        
        expect(patterns[0].Days.length).toEqual(2);  // associated twice
        expect(patterns[1].Days.length).toEqual(1);

        expect(patterns[0].Days[0].date).toEqual('1978-12-17');
        expect(patterns[0].Days[1].date).toEqual('1978-12-18');
        expect(patterns[1].Days[0].date).toEqual('1978-12-18');

        // On the 2nd day there were 2 golds and 7 silvers.
        expect(patterns[0].Days[1].PatternDay.count).toEqual(2);
        expect(patterns[1].Days[0].PatternDay.count).toEqual(7);

      });
  });
});
