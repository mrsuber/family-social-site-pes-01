const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tag: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    reply: {
      type: DataTypes.UUID,
      allowNull: true
    },
    likes: {
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
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'post_id'
    },
    postUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'post_user_id'
    }
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true
  }
);

module.exports = Comment;
