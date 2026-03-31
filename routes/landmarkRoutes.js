const router = require('express').Router();
const landmarkCtrl = require('../controllers/landmarkCtrl');
const { auth } = require('../middleware/auth');

// Get all landmarks
router.get('/landmarks', auth, landmarkCtrl.getAllLandmarks);

// Get landmarks by general ID
router.get('/landmarks/general/:generalId', auth, landmarkCtrl.getLandmarksByGeneral);

// Get single landmark by ID
router.get('/landmarks/:id', auth, landmarkCtrl.getLandmarkById);

// Create new landmark
router.post('/landmarks', auth, landmarkCtrl.createLandmark);

// Update landmark
router.put('/landmarks/:id', auth, landmarkCtrl.updateLandmark);

// Update progress
router.put('/landmarks/:id/progress', auth, landmarkCtrl.updateProgress);

// Update payment status
router.put('/landmarks/:id/payment', auth, landmarkCtrl.updatePaymentStatus);

// Add photo
router.post('/landmarks/:id/photo', auth, landmarkCtrl.addPhoto);

// Update checklist
router.put('/landmarks/:id/checklist', auth, landmarkCtrl.updateChecklist);

// Delete landmark
router.delete('/landmarks/:id', auth, landmarkCtrl.deleteLandmark);

module.exports = router;
