'use strict';
import { Model } from 'sequelize';

interface ProjectAssignmentAttributes {
  ProjectId: number;
  UserId: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class ProjectAssignment extends Model<ProjectAssignmentAttributes> implements ProjectAssignmentAttributes {
    ProjectId!: number;
    UserId!: string;
    static associate(models:any) {
      // define association here
    }
  }
  ProjectAssignment.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'project_assignment',
    modelName: 'ProjectAssignment',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return ProjectAssignment;
};
