const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Person extends Model {}

Person.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'full_name'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Job title or role (e.g., TAILOR, Software Engineer)'
    },
    photoUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'photo_url'
    },
    relationshipType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'relationship_type',
      comment: 'high_commander, employee, girlfriend_candidate, business_contact, current_candidate, family, friend'
    },
    generalId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      },
      comment: 'Which general this person belongs to'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
      comment: 'active, inactive, candidate, archived'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'City, Country (e.g., Douala, Cameroon | Buea)'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    physicalAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'physical_address'
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'marital_status',
      comment: 'single, married, divorced, widowed'
    },
    childrenCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'children_count'
    },
    hasTwins: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'has_twins'
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Profile description'
    },
    strategicGoal: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'strategic_goal',
      comment: 'How this person contributes to the mission'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Private notes about this person'
    },
    performanceRating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'performance_rating',
      comment: '0-100 rating'
    },
    lastContactDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_contact_date'
    }
  },
  {
    sequelize,
    modelName: 'Person',
    tableName: 'people',
    timestamps: true,
    indexes: [
      {
        fields: ['relationship_type']
      },
      {
        fields: ['general_id']
      },
      {
        fields: ['status']
      }
    ]
  }
);

module.exports = Person;
