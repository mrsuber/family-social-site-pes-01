const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class IslamicLesson extends Model {}

IslamicLesson.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'module_id',
      references: {
        model: 'islamic_course_modules',
        key: 'id'
      },
      comment: 'Parent module this lesson belongs to'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Lesson title/topic'
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Detailed content, notes, explanations (markdown supported)'
    },
    anchorName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'anchor_name',
      comment: 'URL anchor for deep linking to this lesson'
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order_number',
      comment: 'Display order within module'
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of image URLs for visual aids'
    },
    videos: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of video URLs for lectures/explanations'
    },
    keyPoints: {
      type: DataTypes.JSONB,
      defaultValue: [],
      field: 'key_points',
      comment: 'Array of key takeaways from this lesson'
    }
  },
  {
    sequelize,
    modelName: 'IslamicLesson',
    tableName: 'islamic_lessons',
    timestamps: true,
    underscored: true
  }
);

module.exports = IslamicLesson;
