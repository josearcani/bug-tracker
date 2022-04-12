'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface NoteAttributes {
  id: string;
  content: string;
  authorId: string;
  bugId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Note extends Model<NoteAttributes> implements NoteAttributes {
    id!: string;
    content!: string;
    authorId!: string;
    bugId!: string;
    static associate(models: any) {
      // define association here
    }
  }
  Note.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bugId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bugs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'notes',
    modelName: 'Note',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Note;
};