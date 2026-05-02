const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class BiographySection extends Model {}

BiographySection.init(
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
      },
      onDelete: 'CASCADE',
      comment: 'The person this biography section belongs to'
    },
    sectionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'section_number',
      comment: 'Order of sections (1, 2, 3, etc.)'
    },
    sectionTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'section_title',
      comment: 'Title of this section (e.g., "Where You Came From", "The Mission")'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Full content of this section (supports Markdown)'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date',
      comment: 'Starting date of events covered in this section'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date',
      comment: 'Ending date of events covered in this section'
    },
    keyNumbers: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'key_numbers',
      comment: 'Important numbers to track (e.g., {"income": "3000 FCFA/day", "debt": "2.5M FCFA"})'
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
      comment: 'Tags for categorizing (e.g., ["anger", "poverty", "education"])'
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_private',
      comment: 'Whether this section is private (only visible to owner)'
    },
    rawDiaryExcerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'raw_diary_excerpt',
      comment: 'Original diary text if this section includes diary content'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    modelName: 'BiographySection',
    tableName: 'biography_sections',
    timestamps: true,
    indexes: [
      {
        fields: ['person_id']
      },
      {
        fields: ['person_id', 'section_number'],
        unique: true
      },
      {
        fields: ['tags'],
        using: 'gin'
      }
    ]
  }
);

module.exports = BiographySection;
