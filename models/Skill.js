const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Skill extends Model {}

Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Skill name (e.g., SEAMSTRESS, JavaScript, Agriculture)'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'technical, soft_skill, craft, language, etc.'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills',
    timestamps: true
  }
);

module.exports = Skill;
