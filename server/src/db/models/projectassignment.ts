'use strict';
import { Model } from 'sequelize';

interface ProjectAssignmentAttributes {
  id: number;
  projectId: string;
  userId: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class ProjectAssignment extends Model<ProjectAssignmentAttributes> implements ProjectAssignmentAttributes {
    id!: number;
    projectId!: string;
    userId!: string;
    static associate(models:any) {
      // define association here
    }
  }
  ProjectAssignment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    timestamps: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  });
  return ProjectAssignment;
};
