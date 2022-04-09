'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface ProjectAttributes {
  id: number;
  title: string;
  status: string;
  createdBy: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id!: number;
    title!: string;
    status!: string;
    createdBy!: string;
    static associate(models:any) {
      // define association here
      Project.belongsToMany(models.User, {
        through: 'ProjectAssignment'
      })
    }
  }
  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      field:'created_by',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Project;
};
