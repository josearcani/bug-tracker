'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface UserAttributes {
  id: string;
  username: string;
  fName: string;
  lName: string;
  profilePic: string;
  email: string;
  password: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!:string;
    username!: string; // not nullable and also string
    fName!: string;
    lName!: string;
    profilePic!: string;
    email!: string;
    password!: string;
    static associate(models:any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: 'project_assignment'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'f_name',
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'l_name',
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_pic',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return User;
};
