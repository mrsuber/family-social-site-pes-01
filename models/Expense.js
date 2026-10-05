const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    category: {
      type: DataTypes.ENUM(
        'food',
        'transport',
        'utilities',
        'rent',
        'entertainment',
        'health',
        'education',
        'other',
        'salary',
        'equipment',
        'investment'
      ),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    expenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'expense_date'
    },
    isInvestment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_investment'
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_recurring'
    },
    nextDueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'next_due_date'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',
    timestamps: true,
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['expense_date']
      },
      {
        fields: ['is_investment']
      },
      {
        fields: ['person_id']
      }
    ]
  }
);

module.exports = Expense;
