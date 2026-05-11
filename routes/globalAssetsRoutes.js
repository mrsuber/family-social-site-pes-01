const router = require('express').Router();
const globalAssetsCtrl = require('../controllers/globalAssetsCtrl');
const { auth } = require('../middleware/auth');

// Get all global assets
router.get('/global-assets', auth, globalAssetsCtrl.getAllAssets);

// Get global assets by type
router.get('/global-assets/type/:type', auth, globalAssetsCtrl.getAssetsByType);

// Get global assets by country
router.get('/global-assets/country/:country', auth, globalAssetsCtrl.getAssetsByCountry);

// Get single global asset by ID
router.get('/global-assets/:id', auth, globalAssetsCtrl.getAssetById);

// Create new global asset
router.post('/global-assets', auth, globalAssetsCtrl.createAsset);

// Update global asset
router.put('/global-assets/:id', auth, globalAssetsCtrl.updateAsset);

// Delete global asset
router.delete('/global-assets/:id', auth, globalAssetsCtrl.deleteAsset);

module.exports = router;
