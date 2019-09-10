'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    googleId: DataTypes.STRING,
    email: DataTypes.STRING,
    imageUrl: DataTypes.STRING 
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Pattern);
  };
  return User;
};