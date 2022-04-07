'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_assignment', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        field: 'project_id',
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_assignment');
  }
};