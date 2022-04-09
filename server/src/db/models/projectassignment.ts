'use strict';
import { Model, Sequelize } from 'sequelize';

interface ProjectAssignmentAttributes {
  ProjectId: string;
  UserId: string;
  JoinedAt: string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class ProjectAssignment extends Model<ProjectAssignmentAttributes> implements ProjectAssignmentAttributes {
    ProjectId!: string;
    UserId!: string;
    JoinedAt!: string;
    static associate(models:any) {
      // define association here
    }
  }
  ProjectAssignment.init({
    ProjectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    JoinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field:'joined_at',
    }
  }, {
    sequelize,
    tableName: 'project_assignment',
    modelName: 'ProjectAssignment',
    timestamps: false,
  });
  return ProjectAssignment;
};
