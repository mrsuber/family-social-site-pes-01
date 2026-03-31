const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class IslamicResource extends Model {}

IslamicResource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'lesson_id',
      references: {
        model: 'islamic_lessons',
        key: 'id'
      },
      comment: 'Lesson this resource belongs to'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Resource title (e.g., book name, article title)'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'book, article, video, audio, website, pdf'
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'URL or path to the resource'
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Author/creator of the resource'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'What this resource covers and why it\'s recommended'
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_required',
      comment: 'Whether this resource is required or supplemental'
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order_number',
      comment: 'Display order within lesson'
    }
  },
  {
    sequelize,
    modelName: 'IslamicResource',
    tableName: 'islamic_resources',
    timestamps: true,
    underscored: true
  }
);

module.exports = IslamicResource;
