"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PatternDays", {
      count: Sequelize.INTEGER,
      // Day belongs to many Pattern
      // Pattern belongs to many Day
      DayId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      PatternId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("PatternDays");
  }
};
