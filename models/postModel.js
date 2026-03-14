const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: []
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true
  }
);

module.exports = Post;
