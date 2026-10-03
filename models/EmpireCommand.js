const mongoose = require('mongoose');

// Empire Command Center - Main Dashboard Data
const empireCommandSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },

  // Vital Signs
  vitalSigns: {
    cashNet: {
      type: Number,
      default: 0
    },
    runway: {
      type: Number,
      default: 0
    },
    nextDeadline: {
      title: String,
      days: Number,
      date: String
    },
    criticalProject: {
      name: String,
      completion: Number,
      daysToLaunch: Number
    },
    peopleStatus: {
      alertLevel: {
        type: String,
        enum: ['positive', 'warning', 'urgent', 'critical'],
        default: 'positive'
      },
      message: String
    }
  },

  // Project Organization
  projects: {
    critical: [{
      type: String
    }],
    active: [{
      type: String
    }],
    hold: [{
      type: String
    }]
  },

  // Time Allocation (hours per week)
  timeAllocation: {
    camsol: {
      type: Number,
      default: 0
    },
    suberfood: {
      type: Number,
      default: 0
    },
    admin: {
      type: Number,
      default: 0
    }
  },

  // Financial Data
  income: {
    type: Number,
    default: 0
  },
  expenses: [{
    name: String,
    amount: Number
  }],

  // Timeline Events
  timeline: [{
    date: String,
    label: String,
    month: Number,
    day: Number,
    color: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    }
  }],

  // Team Members
  team: [{
    name: String,
    role: String,
    status: {
      type: String,
      enum: ['active', 'arriving', 'waiting', 'inactive'],
      default: 'active'
    },
    arrivalDate: Date,
    tasks: [String],
    notes: String
  }],

  // Custom Settings
  settings: {
    viewMode: {
      type: String,
      enum: ['commander', 'ali'],
      default: 'commander'
    },
    showMorningBrief: {
      type: Boolean,
      default: true
    },
    lastMorningBrief: Date
  }

}, {
  timestamps: true
});

// Index for quick user lookup
empireCommandSchema.index({ userId: 1 });

module.exports = mongoose.model('empireCommand', empireCommandSchema);
