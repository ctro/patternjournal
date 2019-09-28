"use strict";
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define(
    "Day",
    {
      date: DataTypes.DATEONLY,
      note: DataTypes.TEXT
    },
    {}
  );
  Day.associate = function(models) {
    models.Day.belongsToMany(models.Pattern, { through: models.PatternDay });
    models.Day.belongsTo(models.User);
  };
  return Day;
};
