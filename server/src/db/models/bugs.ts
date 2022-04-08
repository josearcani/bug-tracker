'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface BugAttributes {
  id: string;
  title: string;
  description: string;
  priority: string;
  isResolved: boolean;
  closedAt: string;
  reopenedBy: string;
  reopenedAt: string;
  projectId: string;
  closedBy: string;
  createdBy: string;
  updatedBy: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Bugs extends Model<BugAttributes> implements BugAttributes {
    id!: string;
    title!: string;
    description!: string;
    priority!: string;
    isResolved!: boolean;
    closedAt!: string;
    reopenedBy!: string;
    reopenedAt!: string;
    projectId!: string;
    closedBy!: string;
    createdBy!: string;
    updatedBy!: string;
    static associate(models:any) {
      // define association here
    }
  }
  Bugs.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM,
      values: ['low', 'medium', 'high'],
      allowNull: false,
      defaultValue: 'low',
    },
    isResolved: {
      type: DataTypes.BOOLEAN,
      field: 'is_resolved',
      allowNull: false,
      defaultValue: false
    },
    closedAt: {
      type: DataTypes.DATE,
      field: 'closed_at',
      defaultValue: null,
    },
    reopenedBy: {
      type: DataTypes.UUID,
      field: 'reopened_by',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reopenedAt: {
      type: DataTypes.DATE,
      field: 'reopened_at',
      defaultValue: null,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    closedBy: {
      type: DataTypes.UUID,
      field: 'closed_by',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.UUID,
      field: 'updated_by',
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Bugs',
    tableName: 'bugs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Bugs;
};