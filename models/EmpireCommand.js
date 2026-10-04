const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EmpireCommand = sequelize.define('EmpireCommand', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    field: 'user_id'
  },

  // Vital Signs
  vitalSigns: {
    type: DataTypes.JSONB,
    defaultValue: {
      cashNet: 238600,
      runway: 2.5,
      nextDeadline: {
        title: 'Ali arrives',
        days: 6,
        date: 'Oct 10'
      },
      criticalProject: {
        name: 'SuberFood',
        completion: 70,
        daysToLaunch: 58
      },
      peopleStatus: {
        alertLevel: 'urgent',
        message: 'Training not ready'
      }
    },
    field: 'vital_signs'
  },

  // Project Organization
  projects: {
    type: DataTypes.JSONB,
    defaultValue: {
      critical: ['suberfood', 'sdo'],
      active: ['pwc', 'craftex'],
      hold: ['ngo', 'bank', 'growth']
    }
  },

  // Time Allocation (hours per week)
  timeAllocation: {
    type: DataTypes.JSONB,
    defaultValue: {
      camsol: 24,
      suberfood: 12,
      admin: 4
    },
    field: 'time_allocation'
  },

  // Financial Data
  income: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 300000
  },

  expenses: {
    type: DataTypes.JSONB,
    defaultValue: [
      { name: 'Rent', amount: 70000 },
      { name: 'Food', amount: 50000 },
      { name: 'Internet', amount: 30000 },
      { name: 'Hosting / Cloud', amount: 18600 },
      { name: 'Claude AI (×2)', amount: 24000 },
      { name: 'Utilities', amount: 20000 },
      { name: 'Other', amount: 26000 }
    ]
  },

  // Timeline Events
  timeline: {
    type: DataTypes.JSONB,
    defaultValue: [
      { date: 'Oct 10', label: 'Ali arrives', month: 9, day: 10, color: '#EF4444', priority: 'critical' },
      { date: 'Oct 20', label: 'SDO report due', month: 9, day: 20, color: '#F59E0B', priority: 'high' },
      { date: 'Oct 31', label: 'SuberFood platform complete', month: 9, day: 31, color: '#EF4444', priority: 'critical' },
      { date: 'Nov 1–15', label: 'Ali surveys Buea customers', month: 10, day: 1, color: '#3B82F6', priority: 'medium' },
      { date: 'Nov 16–30', label: 'Farmer visits — Foumbot, Yaoundé', month: 10, day: 16, color: '#3B82F6', priority: 'medium' },
      { date: 'Dec 1', label: 'SuberFood launch', month: 11, day: 1, color: '#EF4444', priority: 'critical' }
    ]
  },

  // Team Members
  team: {
    type: DataTypes.JSONB,
    defaultValue: [
      {
        name: 'Ali Barkat',
        role: 'SuberFood Operations Manager',
        status: 'arriving',
        arrivalDate: '2026-10-10',
        tasks: ['Complete platform training', 'Review customer survey plan', 'Identify target quarters in Buea'],
        notes: 'Living with you in Buea'
      },
      {
        name: 'KD',
        role: 'Accountant / tax compliance',
        status: 'waiting',
        notes: 'Hire when SuberFood hits 200K/mo'
      }
    ]
  },

  // Custom Settings
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {
      viewMode: 'commander',
      showMorningBrief: true
    }
  }
}, {
  tableName: 'empire_commands',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id']
    }
  ]
});

module.exports = EmpireCommand;
