"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pattern = sequelize.define(
    "Pattern",
    {
      name: DataTypes.STRING,
      color: DataTypes.STRING
    },
    {}
  );
  Pattern.associate = function(models) {
    models.Pattern.belongsTo(models.User);
    models.Pattern.belongsToMany(models.Day, { through: models.PatternDay });
  };
  return Pattern;
};
