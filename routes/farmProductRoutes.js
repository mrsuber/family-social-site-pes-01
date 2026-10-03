const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const farmProductCtrl = require('../controllers/farmProductCtrl');

// ============================================================
// FARM PRODUCTS ROUTES
// ============================================================

// Get all products (with optional filters)
router.get('/products', auth, farmProductCtrl.getAllProducts);

// Get low stock products
router.get('/products/low-stock', auth, farmProductCtrl.getLowStockProducts);

// Get out of stock products
router.get('/products/out-of-stock', auth, farmProductCtrl.getOutOfStockProducts);

// Get products by category
router.get('/products/category/:category', auth, farmProductCtrl.getProductsByCategory);

// Get single product
router.get('/products/:id', auth, farmProductCtrl.getProduct);

// Create product
router.post('/products', auth, farmProductCtrl.createProduct);

// Update product
router.put('/products/:id', auth, farmProductCtrl.updateProduct);

// Upload product images (multiple files)
router.post(
  '/products/:id/images',
  auth,
  upload.array('images', 10), // Allow up to 10 images
  farmProductCtrl.uploadProductImages
);

// Delete product image
router.delete('/products/:id/images', auth, farmProductCtrl.deleteProductImage);

// Set primary image
router.patch('/products/:id/primary-image', auth, farmProductCtrl.setPrimaryImage);

// Update stock
router.patch('/products/:id/stock', auth, farmProductCtrl.updateStock);

// Delete product
router.delete('/products/:id', auth, farmProductCtrl.deleteProduct);

module.exports = router;
