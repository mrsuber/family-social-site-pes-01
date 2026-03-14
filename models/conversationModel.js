const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Conversation extends Model {}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    recipients: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: []
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    media: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    call: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversations',
    timestamps: true
  }
);

module.exports = Conversation;
