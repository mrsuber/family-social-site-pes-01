const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class IncomeStream extends Model {}

IncomeStream.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the income source'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Details about this income stream'
    },
    incomeType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'monthly',
      field: 'income_type',
      comment: 'monthly, one-time, contract, project',
      validate: {
        isIn: [['monthly', 'one-time', 'contract', 'project', 'recurring']]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      comment: 'Income amount'
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'XAF',
      comment: 'XAF, USD, EUR, etc.'
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'monthly, quarterly, yearly, one-time',
      validate: {
        isIn: [['monthly', 'quarterly', 'yearly', 'one-time', null]]
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      comment: 'active, inactive, completed, cancelled',
      validate: {
        isIn: [['active', 'inactive', 'completed', 'cancelled']]
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date',
      comment: 'When income started'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date',
      comment: 'When income ended (for contracts/projects)'
    },
    contractDocument: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'contract_document',
      comment: 'Path to contract PDF or document'
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'client_name',
      comment: 'Name of client/customer'
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      },
      comment: 'Related project if applicable'
    },
    // Relationships
    generalId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      },
      comment: 'Which general oversees this income stream'
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'department_id',
      references: {
        model: 'departments',
        key: 'id'
      },
      comment: 'Which department generates this income'
    },
    personId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'person_id',
      references: {
        model: 'people',
        key: 'id'
      },
      comment: 'Assigned person responsible for this income'
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      },
      comment: 'Related project if applicable'
    },
    // Tracking
    lastPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_payment_date',
      comment: 'Last time payment was received'
    },
    nextPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'next_payment_date',
      comment: 'Expected next payment date'
    },
    totalReceived: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
      field: 'total_received',
      comment: 'Total amount received so far'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes'
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#10b981',
      comment: 'Color for visual representation (default green)'
    }
  },
  {
    sequelize,
    modelName: 'IncomeStream',
    tableName: 'income_streams',
    timestamps: true,
    indexes: [
      {
        fields: ['status']
      },
      {
        fields: ['income_type']
      },
      {
        fields: ['general_id']
      },
      {
        fields: ['department_id']
      }
    ]
  }
);

module.exports = IncomeStream;
