"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      googleId: DataTypes.STRING,
      email: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    {}
  );

  User.associate = function(models) {
    models.User.hasMany(models.Pattern, { as: 'Patterns' });
  };

  // Class Methods

  // Do Login, which is basically a find-or-create
  // {profile: {id: <googleId>, displayName: <string>, emails: [<email>], photos: [<url>]}}
  // used in app.js Login configuration, also to mock tests.
  User.doLogin = function(profile) {
    return this.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        name: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value
      }
    }).then(([theUser, created]) => {
      console.log("😎 User doing login " + JSON.stringify(theUser));
      return theUser;
    });
  };

  return User;
};
