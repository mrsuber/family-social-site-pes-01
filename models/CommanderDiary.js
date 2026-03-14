const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CommanderDiary extends Model {}

CommanderDiary.init(
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
    entryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'entry_date'
    },
    entryType: {
      type: DataTypes.STRING,
      defaultValue: 'text',
      field: 'entry_type',
      comment: 'text, audio, both'
    },
    textContent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'text_content'
    },
    audioUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'audio_url'
    },
    audioDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'audio_duration',
      comment: 'Duration in seconds'
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'excellent, good, neutral, stressed, difficult'
    },
    tags: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'CommanderDiary',
    tableName: 'commander_diary',
    timestamps: true,
    underscored: true
  }
);

module.exports = CommanderDiary;
