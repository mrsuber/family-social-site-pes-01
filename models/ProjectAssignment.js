const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ProjectAssignment extends Model {}

ProjectAssignment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      }
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
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Role in this project (lead, developer, analyst, etc.)'
    },
    assignedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'assigned_date'
    },
    hoursAllocated: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: true,
      field: 'hours_allocated',
      comment: 'Hours per week allocated to this project'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    }
  },
  {
    sequelize,
    modelName: 'ProjectAssignment',
    tableName: 'project_assignments',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['project_id', 'person_id']
      }
    ]
  }
);

module.exports = ProjectAssignment;
