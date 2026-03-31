const router = require('express').Router();
const { auth } = require('../middleware/auth');
const restaurantCtrl = require('../controllers/restaurantCtrl');
const inventoryCtrl = require('../controllers/inventoryCtrl');
const menuItemCtrl = require('../controllers/menuItemCtrl');
const restaurantOrderCtrl = require('../controllers/restaurantOrderCtrl');
const supplierCtrl = require('../controllers/supplierCtrl');

// ============================================================
// RESTAURANT ROUTES
// ============================================================

// Get all restaurants
router.get('/restaurants', auth, restaurantCtrl.getRestaurants);

// Get single restaurant
router.get('/restaurants/:id', auth, restaurantCtrl.getRestaurant);

// Create restaurant
router.post('/restaurants', auth, restaurantCtrl.createRestaurant);

// Update restaurant
router.put('/restaurants/:id', auth, restaurantCtrl.updateRestaurant);

// Delete restaurant
router.delete('/restaurants/:id', auth, restaurantCtrl.deleteRestaurant);

// ============================================================
// SUPPLIER ROUTES
// ============================================================

// Get all suppliers
router.get('/suppliers', auth, supplierCtrl.getSuppliers);

// Get active suppliers
router.get('/suppliers/active', auth, supplierCtrl.getActiveSuppliers);

// Get single supplier
router.get('/suppliers/:id', auth, supplierCtrl.getSupplier);

// Create supplier
router.post('/suppliers', auth, supplierCtrl.createSupplier);

// Update supplier
router.put('/suppliers/:id', auth, supplierCtrl.updateSupplier);

// Delete supplier
router.delete('/suppliers/:id', auth, supplierCtrl.deleteSupplier);

// ============================================================
// INVENTORY ROUTES
// ============================================================

// Get all inventory items for a restaurant
router.get('/restaurants/:restaurantId/inventory', auth, inventoryCtrl.getInventoryItems);

// Get low stock items for a restaurant
router.get('/restaurants/:restaurantId/inventory/low-stock', auth, inventoryCtrl.getLowStockItems);

// Get single inventory item
router.get('/inventory/:id', auth, inventoryCtrl.getInventoryItem);

// Create inventory item
router.post('/inventory', auth, inventoryCtrl.createInventoryItem);

// Update inventory item
router.put('/inventory/:id', auth, inventoryCtrl.updateInventoryItem);

// Update stock quantity (add or subtract)
router.patch('/inventory/:id/stock', auth, inventoryCtrl.updateStock);

// Delete inventory item
router.delete('/inventory/:id', auth, inventoryCtrl.deleteInventoryItem);

// ============================================================
// MENU ITEM ROUTES
// ============================================================

// Get all menu items for a restaurant
router.get('/restaurants/:restaurantId/menu', auth, menuItemCtrl.getMenuItems);

// Get available menu items (for POS)
router.get('/restaurants/:restaurantId/menu/available', auth, menuItemCtrl.getAvailableMenuItems);

// Get popular menu items
router.get('/restaurants/:restaurantId/menu/popular', auth, menuItemCtrl.getPopularMenuItems);

// Get menu items by category
router.get('/restaurants/:restaurantId/menu/category/:category', auth, menuItemCtrl.getMenuItemsByCategory);

// Get single menu item
router.get('/menu/:id', auth, menuItemCtrl.getMenuItem);

// Create menu item
router.post('/menu', auth, menuItemCtrl.createMenuItem);

// Update menu item
router.put('/menu/:id', auth, menuItemCtrl.updateMenuItem);

// Toggle availability
router.patch('/menu/:id/availability', auth, menuItemCtrl.toggleAvailability);

// Delete menu item
router.delete('/menu/:id', auth, menuItemCtrl.deleteMenuItem);

// ============================================================
// ORDER ROUTES (POS)
// ============================================================

// Get all orders for a restaurant (with optional filters)
router.get('/restaurants/:restaurantId/orders', auth, restaurantOrderCtrl.getOrders);

// Get active orders (received, preparing, ready)
router.get('/restaurants/:restaurantId/orders/active', auth, restaurantOrderCtrl.getActiveOrders);

// Get daily sales summary
router.get('/restaurants/:restaurantId/orders/sales/daily', auth, restaurantOrderCtrl.getDailySales);

// Get order by order number
router.get('/orders/number/:orderNumber', auth, restaurantOrderCtrl.getOrderByNumber);

// Get single order by ID
router.get('/orders/:id', auth, restaurantOrderCtrl.getOrder);

// Create order
router.post('/orders', auth, restaurantOrderCtrl.createOrder);

// Update order
router.put('/orders/:id', auth, restaurantOrderCtrl.updateOrder);

// Update order status
router.patch('/orders/:id/status', auth, restaurantOrderCtrl.updateOrderStatus);

// Process payment
router.patch('/orders/:id/payment', auth, restaurantOrderCtrl.processPayment);

// Cancel order
router.patch('/orders/:id/cancel', auth, restaurantOrderCtrl.cancelOrder);

// Delete order
router.delete('/orders/:id', auth, restaurantOrderCtrl.deleteOrder);

module.exports = router;
