const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const referralCtrl = require('../controllers/referralCtrl');

// User routes (requires authentication)
router.get('/my-referral', auth, referralCtrl.getMyReferralInfo);

router.post(
  '/submit-verification',
  auth,
  upload.fields([
    { name: 'idCard', maxCount: 1 },
    { name: 'photo', maxCount: 1 }
  ]),
  referralCtrl.submitVerification
);

// Admin routes (requires admin authentication - add admin middleware as needed)
router.get('/admin/all', auth, referralCtrl.getAllReferrals);
router.get('/admin/pending', auth, referralCtrl.getPendingVerifications);
router.patch('/admin/:referralId/approve', auth, referralCtrl.approveVerification);
router.patch('/admin/:referralId/reject', auth, referralCtrl.rejectVerification);
router.patch('/admin/:referralId/commission', auth, referralCtrl.updateCommission);

module.exports = router;
