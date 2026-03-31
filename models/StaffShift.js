const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StaffShift = sequelize.define('StaffShift', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  restaurantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  staffId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('chef', 'sous_chef', 'cook', 'server', 'cashier', 'manager', 'cleaner'),
    allowNull: false
  },
  shiftDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  actualStartTime: {
    type: DataTypes.TIME
  },
  actualEndTime: {
    type: DataTypes.TIME
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'checked_in', 'completed', 'absent', 'cancelled'),
    defaultValue: 'scheduled'
  },
  notes: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'staff_shifts',
  timestamps: true
});

module.exports = StaffShift;
