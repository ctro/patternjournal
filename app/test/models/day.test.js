var db = require("../../models");
var helpers = require("../../helpers");

describe("Day model", () => {
  test("Day CRUD and relationships", async () => {
    var theDay = null;
    return db.Day.create(
      {
        date: helpers.pjDate(2020, 11, 13),
        note: "Hi",
        UserId: 1,
        Patterns: [
          {
            name: "Salmon",
            color: "pink"
          }
        ]
      },
      { include: [db.Pattern] }
    )
      .then(day => {
        theDay = day; // remember it.
        expect(day.note).toEqual("Hi");
        expect(day.date).toEqual("2020-11-13");
        expect(day.UserId).toEqual(1);

        expect(day.getPatterns()).not.toBeUndefined();
        return day.getPatterns();
      })
      .then(patterns => {
        expect(patterns[0].name).toEqual("Salmon");
        expect(patterns[0].color).toEqual("pink");
        return theDay.getUser();
      })
      .then(user => {
        expect(user.id).toEqual(1);
      });
  });
});
