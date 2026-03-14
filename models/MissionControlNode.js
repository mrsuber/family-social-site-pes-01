const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class MissionControlNode extends Model {}

MissionControlNode.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nodeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'node_id',
      comment: 'The node ID from ReactFlow (e.g., general-uuid, person-uuid)'
    },
    positionX: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'position_x',
      comment: 'X coordinate on canvas'
    },
    positionY: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'position_y',
      comment: 'Y coordinate on canvas'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id',
      comment: 'Optional: if positions are per-user (for future multi-user support)'
    }
  },
  {
    sequelize,
    modelName: 'MissionControlNode',
    tableName: 'mission_control_nodes',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['node_id']
      },
      {
        fields: ['user_id']
      }
    ]
  }
);

module.exports = MissionControlNode;
