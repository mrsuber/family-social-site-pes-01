const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Language extends Model {}

Language.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    personId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'person_id',
      references: {
        model: 'people',
        key: 'id'
      }
    },
    languageName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'language_name'
    },
    proficiencyLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'proficiency_level',
      comment: 'native, fluent, intermediate, basic'
    },
    canRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'can_read'
    },
    canWrite: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'can_write'
    },
    canSpeak: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'can_speak'
    }
  },
  {
    sequelize,
    modelName: 'Language',
    tableName: 'languages',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['person_id', 'language_name']
      }
    ]
  }
);

module.exports = Language;
