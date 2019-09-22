var db = require("../../models");
var helpers = require("../../helpers");

describe("Day model", () => {
  test("Day CRUD and relationships", async () => {
    return db.Day.create(
      {
        date: helpers.pjDate(2020, 11, 13),
        note: "Hi",
        Patterns: [{
          name: "Salmon",
          color: "pink"
        }]
      },
      { include: [db.Pattern] }
    ).then(day => {
      expect(day.note).toEqual("Hi");
      console.log(day.date);
      expect(day.date).toEqual("2020-11-13");

      expect(day.getPatterns()).not.toBeUndefined();
      return day.getPatterns();
    }).then(patterns => {
     expect(patterns[0].name).toEqual("Salmon");
     expect(patterns[0].color).toEqual("pink");
    });
  });
});
