const RestaurantOrder = require('../models/RestaurantOrder');
const Restaurant = require('../models/Restaurant');
const Person = require('../models/Person');

const restaurantOrderCtrl = {
  // Get all orders for a restaurant
  getOrders: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { status, paymentStatus, startDate, endDate } = req.query;

      const where = { restaurantId };

      // Add filters if provided
      if (status) where.orderStatus = status;
      if (paymentStatus) where.paymentStatus = paymentStatus;

      if (startDate && endDate) {
        where.orderedAt = {
          [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const orders = await RestaurantOrder.findAll({
        where,
        order: [['orderedAt', 'DESC']]
      });

      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get single order by ID
  getOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await RestaurantOrder.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get orders by order number
  getOrderByNumber: async (req, res) => {
    try {
      const { orderNumber } = req.params;
      const order = await RestaurantOrder.findOne({
        where: { orderNumber }
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Error fetching order by number:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get active orders (received, preparing, ready)
  getActiveOrders: async (req, res) => {
    try {
      const { restaurantId } = req.params;

      const orders = await RestaurantOrder.findAll({
        where: {
          restaurantId,
          orderStatus: ['received', 'preparing', 'ready']
        },
        order: [['orderedAt', 'ASC']]
      });

      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Error fetching active orders:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get daily sales summary
  getDailySales: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { date } = req.query;

      const targetDate = date ? new Date(date) : new Date();
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      const { Sequelize } = require('sequelize');
      const sequelize = require('../config/database');

      const sales = await RestaurantOrder.findAll({
        where: {
          restaurantId,
          orderedAt: {
            [Sequelize.Op.between]: [startOfDay, endOfDay]
          },
          paymentStatus: 'paid'
        },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders'],
          [sequelize.fn('SUM', sequelize.col('total')), 'totalSales'],
          [sequelize.fn('SUM', sequelize.col('subtotal')), 'totalSubtotal'],
          [sequelize.fn('SUM', sequelize.col('tax')), 'totalTax']
        ],
        raw: true
      });

      res.json({
        success: true,
        data: sales[0]
      });
    } catch (error) {
      console.error('Error fetching daily sales:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new order
  createOrder: async (req, res) => {
    try {
      const orderData = req.body;

      // Validate required fields
      if (!orderData.restaurantId || !orderData.orderType || !orderData.items || !orderData.total) {
        return res.status(400).json({
          success: false,
          message: 'Restaurant ID, order type, items, and total are required'
        });
      }

      // Verify restaurant exists
      const restaurant = await Restaurant.findByPk(orderData.restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      // Generate unique order number
      const orderNumber = await generateOrderNumber(orderData.restaurantId);
      orderData.orderNumber = orderNumber;

      // Verify customer exists if provided
      if (orderData.customerId) {
        const customer = await Person.findByPk(orderData.customerId);
        if (!customer) {
          return res.status(404).json({
            success: false,
            message: 'Customer not found'
          });
        }
      }

      // Verify staff exists if provided
      if (orderData.servedBy) {
        const staff = await Person.findByPk(orderData.servedBy);
        if (!staff) {
          return res.status(404).json({
            success: false,
            message: 'Server not found'
          });
        }
      }

      const order = await RestaurantOrder.create(orderData);

      res.status(201).json({
        success: true,
        data: order,
        message: 'Order created successfully'
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update order
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const order = await RestaurantOrder.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Set timestamps based on status changes
      if (updates.orderStatus) {
        if (updates.orderStatus === 'preparing' && order.orderStatus !== 'preparing') {
          updates.preparedAt = new Date();
        } else if (updates.orderStatus === 'served' && order.orderStatus !== 'served') {
          updates.servedAt = new Date();
        }
      }

      await order.update(updates);

      res.json({
        success: true,
        data: order,
        message: 'Order updated successfully'
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required'
        });
      }

      const order = await RestaurantOrder.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      const updates = { orderStatus: status };

      // Set timestamps based on status
      if (status === 'preparing' && order.orderStatus !== 'preparing') {
        updates.preparedAt = new Date();
      } else if (status === 'served' && order.orderStatus !== 'served') {
        updates.servedAt = new Date();
      } else if (status === 'completed' && order.orderStatus !== 'completed') {
        updates.servedAt = updates.servedAt || new Date();
      }

      await order.update(updates);

      res.json({
        success: true,
        data: order,
        message: `Order status updated to ${status}`
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Process payment
  processPayment: async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentMethod, paymentStatus } = req.body;

      const order = await RestaurantOrder.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      const updates = {};
      if (paymentMethod) updates.paymentMethod = paymentMethod;
      if (paymentStatus) updates.paymentStatus = paymentStatus;

      await order.update(updates);

      res.json({
        success: true,
        data: order,
        message: 'Payment processed successfully'
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Cancel order
  cancelOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await RestaurantOrder.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Only allow cancellation of orders that haven't been completed
      if (order.orderStatus === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Cannot cancel completed order'
        });
      }

      await order.update({
        orderStatus: 'cancelled',
        paymentStatus: order.paymentStatus === 'paid' ? 'refunded' : 'pending'
      });

      res.json({
        success: true,
        data: order,
        message: 'Order cancelled successfully'
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete order (soft delete by marking as cancelled)
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await RestaurantOrder.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      await order.destroy();

      res.json({
        success: true,
        message: 'Order deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

// Helper function to generate unique order number
async function generateOrderNumber(restaurantId) {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');

  // Get count of orders today for this restaurant
  const { Sequelize } = require('sequelize');
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const count = await RestaurantOrder.count({
    where: {
      restaurantId,
      orderedAt: {
        [Sequelize.Op.between]: [startOfDay, endOfDay]
      }
    }
  });

  const orderNum = String(count + 1).padStart(4, '0');
  return `ORD-${dateStr}-${orderNum}`;
}

module.exports = restaurantOrderCtrl;
