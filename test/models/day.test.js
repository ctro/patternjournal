var db = require("../../models");

describe("Day model", () => {
  test("Day CRUD and relationships", async () => {
    return db.Day.create({
      // TODO: why do we always subtract one from the month?
      date:  new Date(2020, (12 - 1), 13),
      note: "Hi"
    }).then(day => {
      expect(day.note).toEqual("Hi");
      console.log(day.date);
      expect(day.date).toEqual('2020-12-13');
    });
  });
});
