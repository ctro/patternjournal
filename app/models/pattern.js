"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pattern = sequelize.define(
    "Pattern",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: "Name can't be empty" }
        }
      },
      color: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: "Color can't be empty" }
        }
      }
    },
    {}
  );
  Pattern.associate = function(models) {
    models.Pattern.belongsTo(models.User);
    models.Pattern.belongsToMany(models.Day, { through: models.PatternDay });
  };
  return Pattern;
};
