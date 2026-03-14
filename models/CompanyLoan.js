const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CompanyLoan extends Model {}

CompanyLoan.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    issuedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued_date',
      defaultValue: DataTypes.NOW
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'due_date'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      comment: 'pending, active, paid, defaulted'
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Reason for the loan'
    },
    interestRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      field: 'interest_rate',
      comment: 'Annual interest rate percentage'
    },
    repaymentSchedule: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'repayment_schedule',
      comment: 'monthly, quarterly, one-time, etc.'
    },
    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'amount_paid'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CompanyLoan',
    tableName: 'company_loans',
    timestamps: true
  }
);

module.exports = CompanyLoan;
