'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role:{
        allowNull: true,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
      },
      startupsInvesting: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      fName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      linkdinId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      teamMembers: {
        allowNull: true,
        type: Sequelize.JSON
      },
      additionalRead: {
        allowNull: true,
        type: Sequelize.JSON
      },
      profileImageUrl:{
        allowNull: true,
        type: Sequelize.STRING
      },
      isAdmin:{
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      isStarred:{
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Details');
  }
};