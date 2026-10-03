const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Referral extends Model {}

Referral.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    referrerId: {
      type: DataTypes.UUID,
      allowNull: true, // Can be null if user signed up without a referral code
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    referralCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: 'Unique referral code for this user'
    },
    verificationStatus: {
      type: DataTypes.ENUM('not_submitted', 'pending', 'approved', 'rejected'),
      defaultValue: 'not_submitted',
      comment: 'Status of KYC verification'
    },
    idCardUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL to uploaded ID card image'
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL to uploaded user photo'
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Verified phone number'
    },
    totalReferrals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Total number of successful referrals'
    },
    activeReferrals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Number of active/verified referrals'
    },
    totalCommission: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      comment: 'Total commission earned in local currency'
    },
    availableCommission: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      comment: 'Available commission for withdrawal'
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'When verification documents were submitted'
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'When verification was approved'
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Reason for verification rejection'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Admin notes about this referral account'
    }
  },
  {
    sequelize,
    modelName: 'Referral',
    tableName: 'referrals',
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
        unique: true,
        name: 'idx_referrals_user_id'
      },
      {
        fields: ['referralCode'],
        unique: true,
        name: 'idx_referrals_referral_code'
      },
      {
        fields: ['referrerId'],
        name: 'idx_referrals_referrer_id'
      },
      {
        fields: ['verificationStatus'],
        name: 'idx_referrals_verification_status'
      }
    ]
  }
);

// Define associations
Referral.associate = (models) => {
  // Referral belongs to User (the user who owns this referral record)
  Referral.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'User',
    onDelete: 'CASCADE'
  });

  // Referral belongs to Referrer (the user who referred this user)
  Referral.belongsTo(models.User, {
    foreignKey: 'referrerId',
    as: 'Referrer',
    onDelete: 'SET NULL'
  });
};

module.exports = Referral;
