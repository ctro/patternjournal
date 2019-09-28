"use strict";
module.exports = (sequelize, DataTypes) => {
  const PatternDay = sequelize.define(
    "PatternDay",
    {
      count: DataTypes.INTEGER
    },
    {}
  );
  PatternDay.associate = function(models) {
    models.PatternDay.belongsTo(models.Pattern);
    models.PatternDay.belongsTo(models.Day);
  };
  return PatternDay;
};
