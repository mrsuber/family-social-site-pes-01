const Referral = require('../models/Referral');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Generate unique referral code
const generateReferralCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const referralCtrl = {
  // Get referral info for logged-in user
  getMyReferralInfo: async (req, res) => {
    try {
      const userId = req.user.id;

      let referral = await Referral.findOne({ where: { userId } });

      // If user doesn't have a referral record, create one
      if (!referral) {
        let referralCode;
        let isUnique = false;

        // Generate unique referral code
        while (!isUnique) {
          referralCode = generateReferralCode();
          const existing = await Referral.findOne({ where: { referralCode } });
          if (!existing) isUnique = true;
        }

        referral = await Referral.create({
          userId,
          referralCode,
          verificationStatus: 'not_submitted'
        });
      }

      // Get list of people user has referred
      const referrals = await Referral.findAll({
        where: { referrerId: userId },
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'fullname', 'username', 'email', 'createdAt']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        data: {
          referral,
          referrals
        }
      });
    } catch (err) {
      console.error('Get referral info error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Submit verification documents with file uploads
  submitVerification: async (req, res) => {
    try {
      const userId = req.user.id;
      const { phoneNumber } = req.body;

      // Check if files were uploaded
      if (!req.files || !req.files.idCard || !req.files.photo) {
        return res.status(400).json({
          msg: 'Both ID card and photo are required'
        });
      }

      if (!phoneNumber) {
        return res.status(400).json({
          msg: 'Phone number is required'
        });
      }

      let referral = await Referral.findOne({ where: { userId } });

      if (!referral) {
        // Create referral record if doesn't exist
        let referralCode;
        let isUnique = false;

        while (!isUnique) {
          referralCode = generateReferralCode();
          const existing = await Referral.findOne({ where: { referralCode } });
          if (!existing) isUnique = true;
        }

        referral = await Referral.create({
          userId,
          referralCode
        });
      }

      // Delete old files if they exist
      if (referral.idCardUrl) {
        const oldIdPath = path.join(__dirname, '..', referral.idCardUrl);
        if (fs.existsSync(oldIdPath)) {
          fs.unlinkSync(oldIdPath);
        }
      }

      if (referral.photoUrl) {
        const oldPhotoPath = path.join(__dirname, '..', referral.photoUrl);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      // Save new file URLs
      const idCardUrl = `/uploads/documents/${req.files.idCard[0].filename}`;
      const photoUrl = `/uploads/photos/${req.files.photo[0].filename}`;

      // Update referral with verification documents
      await referral.update({
        idCardUrl,
        photoUrl,
        phoneNumber,
        verificationStatus: 'pending',
        submittedAt: new Date()
      });

      res.status(200).json({
        success: true,
        msg: 'Verification documents submitted successfully. Awaiting admin approval.',
        data: referral
      });
    } catch (err) {
      console.error('Submit verification error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Admin: Get all pending verifications
  getPendingVerifications: async (req, res) => {
    try {
      const pending = await Referral.findAll({
        where: { verificationStatus: 'pending' },
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'fullname', 'username', 'email', 'createdAt']
          }
        ],
        order: [['submittedAt', 'ASC']]
      });

      res.status(200).json({
        success: true,
        data: pending
      });
    } catch (err) {
      console.error('Get pending verifications error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Admin: Approve verification
  approveVerification: async (req, res) => {
    try {
      const { referralId } = req.params;

      const referral = await Referral.findByPk(referralId);
      if (!referral) {
        return res.status(404).json({ msg: 'Referral not found' });
      }

      await referral.update({
        verificationStatus: 'approved',
        verifiedAt: new Date(),
        rejectionReason: null
      });

      res.status(200).json({
        success: true,
        msg: 'Verification approved successfully',
        data: referral
      });
    } catch (err) {
      console.error('Approve verification error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Admin: Reject verification
  rejectVerification: async (req, res) => {
    try {
      const { referralId } = req.params;
      const { reason } = req.body;

      if (!reason) {
        return res.status(400).json({ msg: 'Rejection reason is required' });
      }

      const referral = await Referral.findByPk(referralId);
      if (!referral) {
        return res.status(404).json({ msg: 'Referral not found' });
      }

      await referral.update({
        verificationStatus: 'rejected',
        rejectionReason: reason,
        verifiedAt: null
      });

      res.status(200).json({
        success: true,
        msg: 'Verification rejected',
        data: referral
      });
    } catch (err) {
      console.error('Reject verification error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Get all referrals (admin)
  getAllReferrals: async (req, res) => {
    try {
      const referrals = await Referral.findAll({
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'fullname', 'username', 'email', 'createdAt']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        data: referrals
      });
    } catch (err) {
      console.error('Get all referrals error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Update commission (admin)
  updateCommission: async (req, res) => {
    try {
      const { referralId } = req.params;
      const { amount, type } = req.body;

      if (!amount || !type) {
        return res.status(400).json({
          msg: 'Amount and type (add/subtract) are required'
        });
      }

      const referral = await Referral.findByPk(referralId);
      if (!referral) {
        return res.status(404).json({ msg: 'Referral not found' });
      }

      const numAmount = parseFloat(amount);

      if (type === 'add') {
        await referral.update({
          totalCommission: parseFloat(referral.totalCommission) + numAmount,
          availableCommission: parseFloat(referral.availableCommission) + numAmount
        });
      } else if (type === 'subtract') {
        await referral.update({
          availableCommission: Math.max(
            0,
            parseFloat(referral.availableCommission) - numAmount
          )
        });
      }

      res.status(200).json({
        success: true,
        msg: 'Commission updated successfully',
        data: referral
      });
    } catch (err) {
      console.error('Update commission error:', err);
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = referralCtrl;
