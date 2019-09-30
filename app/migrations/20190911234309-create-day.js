"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Days", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
       //belongs_to User
       UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // name of target table
          key: "id" // id in target table
        }
      },
      date: Sequelize.DATEONLY,
      note: Sequelize.TEXT,
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
    return queryInterface.dropTable("Days");
  }
};
