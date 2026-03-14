const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class PersonSkill extends Model {}

PersonSkill.init(
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
    skillId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'skill_id',
      references: {
        model: 'skills',
        key: 'id'
      }
    },
    proficiencyLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
      field: 'proficiency_level',
      comment: '0-100 for progress bar visualization',
      validate: {
        min: 0,
        max: 100
      }
    },
    yearsOfExperience: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true,
      field: 'years_of_experience'
    },
    certifications: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of certification names/URLs'
    }
  },
  {
    sequelize,
    modelName: 'PersonSkill',
    tableName: 'person_skills',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['person_id', 'skill_id']
      }
    ]
  }
);

module.exports = PersonSkill;
