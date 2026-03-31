const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class RecurringExpense extends Model {}

RecurringExpense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the expense (e.g., "Starlink Internet", "Office Rent")'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Details about this expense'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'general',
      comment: 'utilities, software, rent, hosting, subscription, etc.',
      validate: {
        isIn: [['utilities', 'software', 'rent', 'hosting', 'subscription', 'insurance', 'general']]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      comment: 'Expense amount'
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'XAF',
      comment: 'XAF, USD, EUR, etc.'
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'monthly',
      comment: 'monthly, quarterly, yearly',
      validate: {
        isIn: [['monthly', 'quarterly', 'yearly', 'weekly', 'daily']]
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      comment: 'active, paused, cancelled',
      validate: {
        isIn: [['active', 'paused', 'cancelled']]
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date',
      comment: 'When expense started'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date',
      comment: 'When expense ended (if cancelled)'
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Service provider (e.g., "Starlink", "Claude AI", "VPS Host")'
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'account_number',
      comment: 'Account or subscription number'
    },
    // Payment tracking
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'payment_method',
      comment: 'How payment is made (card, bank transfer, etc.)'
    },
    dueDay: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'due_day',
      comment: 'Day of month payment is due (1-31)',
      validate: {
        min: 1,
        max: 31
      }
    },
    lastPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_payment_date',
      comment: 'Last time payment was made'
    },
    nextPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'next_payment_date',
      comment: 'Next payment due date'
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
      comment: 'Which general this expense belongs to (null = organization-wide)'
    },
    assetId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'asset_id',
      references: {
        model: 'physical_assets',
        key: 'id'
      },
      comment: 'Related asset if applicable (e.g., Starlink subscription → Starlink asset)'
    },
    // Calculations
    monthlyEquivalent: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      field: 'monthly_equivalent',
      comment: 'Monthly equivalent amount (for yearly/quarterly expenses)'
    },
    yearlyTotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      field: 'yearly_total',
      comment: 'Total yearly cost'
    },
    totalPaid: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
      field: 'total_paid',
      comment: 'Total amount paid so far'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes'
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#ef4444',
      comment: 'Color for visual representation (default red for expenses)'
    },
    isEssential: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_essential',
      comment: 'Whether this is an essential/critical expense'
    }
  },
  {
    sequelize,
    modelName: 'RecurringExpense',
    tableName: 'recurring_expenses',
    timestamps: true,
    hooks: {
      beforeSave: (expense) => {
        // Calculate monthly and yearly equivalents based on frequency
        const amount = parseFloat(expense.amount);

        switch (expense.frequency) {
          case 'monthly':
            expense.monthlyEquivalent = amount;
            expense.yearlyTotal = amount * 12;
            break;
          case 'quarterly':
            expense.monthlyEquivalent = amount / 3;
            expense.yearlyTotal = amount * 4;
            break;
          case 'yearly':
            expense.monthlyEquivalent = amount / 12;
            expense.yearlyTotal = amount;
            break;
          case 'weekly':
            expense.monthlyEquivalent = amount * 4.33; // Average weeks per month
            expense.yearlyTotal = amount * 52;
            break;
          case 'daily':
            expense.monthlyEquivalent = amount * 30;
            expense.yearlyTotal = amount * 365;
            break;
        }
      }
    },
    indexes: [
      {
        fields: ['status']
      },
      {
        fields: ['category']
      },
      {
        fields: ['general_id']
      },
      {
        fields: ['frequency']
      }
    ]
  }
);

module.exports = RecurringExpense;
