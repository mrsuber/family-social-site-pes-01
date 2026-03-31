const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Landmark extends Model {}

Landmark.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name/title of the landmark'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Detailed description of the landmark'
    },
    generalId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      },
      comment: 'Which general this landmark belongs to (optional)'
    },
    personId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'person_id',
      references: {
        model: 'people',
        key: 'id'
      },
      comment: 'Which person this landmark belongs to (for High Commander personal landmarks)'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date',
      comment: 'Start of the time frame'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
      comment: 'Deadline for completion'
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: 'Budget/cost for this landmark'
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
      comment: 'USD, EUR, XAF, etc.'
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      field: 'payment_status',
      comment: 'pending or paid'
    },
    amountPaid: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
      field: 'amount_paid',
      comment: 'Amount paid so far'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      comment: 'pending (not started), processing (in progress), done (completed)'
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'medium',
      comment: 'critical, high, medium, low'
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '0-100 completion percentage',
      validate: {
        min: 0,
        max: 100
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Business, Personal, Family, Spiritual, Financial, Infrastructure, etc.'
    },
    assignedTo: {
      type: DataTypes.JSONB,
      defaultValue: [],
      field: 'assigned_to',
      comment: 'Array of person IDs responsible for this landmark'
    },
    relatedResources: {
      type: DataTypes.JSONB,
      defaultValue: [],
      field: 'related_resources',
      comment: 'Array of related resource IDs (people, departments, projects, assets)'
    },
    checklist: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of sub-tasks: [{id, title, completed, completedAt, completedBy}]'
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      comment: 'Tags for filtering (#urgent, #travel, #construction, etc.)'
    },
    photos: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of photo URLs as proof of completion'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes and updates'
    },
    updatesLog: {
      type: DataTypes.JSONB,
      defaultValue: [],
      field: 'updates_log',
      comment: 'Timeline of updates: [{timestamp, user, action, details}]'
    },
    reminderDays: {
      type: DataTypes.INTEGER,
      defaultValue: 7,
      field: 'reminder_days',
      comment: 'Alert X days before deadline'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at'
    },
    completedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'completed_by',
      references: {
        model: 'people',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Landmark',
    tableName: 'landmarks',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['general_id']
      },
      {
        fields: ['status']
      },
      {
        fields: ['priority']
      },
      {
        fields: ['end_date']
      }
    ]
  }
);

module.exports = Landmark;
