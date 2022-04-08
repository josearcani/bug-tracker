'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bugs', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: Sequelize.DataTypes.ENUM,
        allowNull: false,
        values: ['low', 'medium', 'high'],
        defaultValue: 'low',
      },
      isResolved: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_resolved',
        defaultValue: false,
      },
      closedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        field: 'closed_at',
        defaultValue: null,
      },
      reopenedBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        field: 'reopened_by',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      reopenedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        field: 'reopened_at',
        defaultValue: null,
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
      closedBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        field: 'closed_by',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        field: 'created_by',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updatedBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        field: 'updated_by',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bugs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bugs_priority";');
  }
};