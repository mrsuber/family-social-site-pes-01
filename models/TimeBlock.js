const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class TimeBlock extends Model {}

TimeBlock.init(
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
      comment: 'Person this time block belongs to'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Date of this time block'
    },
    activity: {
      type: DataTypes.ENUM('sleep', 'software', 'subercraftex', 'islam', 'sales', 'family', 'video_editing', 'social_media', 'rewiring'),
      allowNull: false,
      comment: 'Type of activity'
    },
    hours: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      comment: 'Number of hours spent'
    },
    isVision: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_vision',
      comment: 'Is this a vision/future-focused activity'
    },
    energyLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      field: 'energy_level',
      comment: 'Energy level (1-5)'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes'
    }
  },
  {
    sequelize,
    modelName: 'TimeBlock',
    tableName: 'time_blocks',
    timestamps: true,
    indexes: [
      {
        fields: ['date']
      },
      {
        fields: ['person_id']
      }
    ]
  }
);

module.exports = TimeBlock;
