require('dotenv').config();
const { sequelize } = require('../config/db');
const User = require('../models/User');
const Referral = require('../models/Referral');

const createReferralsTable = async () => {
  try {
    console.log('🔌 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('📝 Creating referrals table...');

    // This will create the table if it doesn't exist
    // Use { force: true } to drop and recreate (WARNING: deletes all data)
    // Use { alter: true } to modify existing table structure
    await Referral.sync({ alter: true });

    console.log('✅ Referrals table created/updated successfully!');

    console.log('');
    console.log('✨ REFERRALS TABLE STRUCTURE:');
    console.log('   - id (UUID, Primary Key)');
    console.log('   - userId (UUID, Foreign Key to users)');
    console.log('   - referrerId (UUID, Foreign Key to users, nullable)');
    console.log('   - referralCode (String, Unique)');
    console.log('   - verificationStatus (Enum: not_submitted, pending, approved, rejected)');
    console.log('   - idCardUrl (String, nullable)');
    console.log('   - photoUrl (String, nullable)');
    console.log('   - phoneNumber (String, nullable)');
    console.log('   - totalReferrals (Integer, default 0)');
    console.log('   - activeReferrals (Integer, default 0)');
    console.log('   - totalCommission (Decimal, default 0.00)');
    console.log('   - availableCommission (Decimal, default 0.00)');
    console.log('   - submittedAt (Date, nullable)');
    console.log('   - verifiedAt (Date, nullable)');
    console.log('   - rejectionReason (Text, nullable)');
    console.log('   - notes (Text, nullable)');
    console.log('   - createdAt (Timestamp)');
    console.log('   - updatedAt (Timestamp)');
    console.log('');
    console.log('📊 Indexes created:');
    console.log('   - idx_referrals_user_id (unique)');
    console.log('   - idx_referrals_referral_code (unique)');
    console.log('   - idx_referrals_referrer_id');
    console.log('   - idx_referrals_verification_status');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating referrals table:', error);
    process.exit(1);
  }
};

createReferralsTable();
