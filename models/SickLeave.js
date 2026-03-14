const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class SickLeave extends Model {}

SickLeave.init(
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date'
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      comment: 'active, completed, cancelled'
    },
    medicalCertificateUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'medical_certificate_url'
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_paid',
      comment: 'Whether this is paid sick leave'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'SickLeave',
    tableName: 'sick_leaves',
    timestamps: true
  }
);

module.exports = SickLeave;
