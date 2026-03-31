import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI, patchAPI } from '../../../utils/fetchData';
import './POSSystem.css';

const POSSystem = ({ restaurantId, restaurantName }) => {
  const { auth } = useSelector(state => state);
  const [menuItems, setMenuItems] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({
    items: [],
    orderType: 'dine_in',
    tableNumber: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All', icon: '🍽️' },
    { value: 'appetizer', label: 'Appetizers', icon: '🥗' },
    { value: 'main_course', label: 'Main', icon: '🍛' },
    { value: 'side', label: 'Sides', icon: '🍟' },
    { value: 'dessert', label: 'Desserts', icon: '🍰' },
    { value: 'drink', label: 'Drinks', icon: '🥤' }
  ];

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
      fetchActiveOrders();
      // Poll active orders every 30 seconds
      const interval = setInterval(fetchActiveOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [restaurantId, auth.token]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await getAPI(`restaurants/${restaurantId}/menu/available`, auth.token);
      if (res.data.success) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveOrders = async () => {
    try {
      const res = await getAPI(`restaurants/${restaurantId}/orders/active`, auth.token);
      if (res.data.success) {
        setActiveOrders(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching active orders:', error);
    }
  };

  const addItemToOrder = (menuItem) => {
    const existingItemIndex = currentOrder.items.findIndex(
      item => item.menuItemId === menuItem.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...currentOrder.items];
      updatedItems[existingItemIndex].quantity += 1;
      setCurrentOrder({ ...currentOrder, items: updatedItems });
    } else {
      const newItem = {
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1
      };
      setCurrentOrder({
        ...currentOrder,
        items: [...currentOrder.items, newItem]
      });
    }
  };

  const removeItemFromOrder = (index) => {
    const updatedItems = currentOrder.items.filter((_, i) => i !== index);
    setCurrentOrder({ ...currentOrder, items: updatedItems });
  };

  const updateItemQuantity = (index, change) => {
    const updatedItems = [...currentOrder.items];
    updatedItems[index].quantity += change;

    if (updatedItems[index].quantity <= 0) {
      removeItemFromOrder(index);
    } else {
      setCurrentOrder({ ...currentOrder, items: updatedItems });
    }
  };

  const calculateTotal = () => {
    return currentOrder.items.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (currentOrder.items.length === 0) {
      alert('Please add items to the order');
      return;
    }

    if (currentOrder.orderType === 'dine_in' && !currentOrder.tableNumber) {
      alert('Please enter a table number for dine-in orders');
      return;
    }

    const subtotal = calculateTotal();
    const orderData = {
      restaurant_id: restaurantId,
      order_type: currentOrder.orderType,
      table_number: currentOrder.tableNumber || null,
      items: currentOrder.items,
      subtotal: subtotal,
      tax: 0,
      total: subtotal,
      payment_method: 'cash',
      payment_status: 'pending',
      order_status: 'received',
      notes: currentOrder.notes || null
    };

    try {
      const res = await postAPI('orders', orderData, auth.token);
      if (res.data.success) {
        alert('Order placed successfully!');
        setCurrentOrder({
          items: [],
          orderType: 'dine_in',
          tableNumber: '',
          notes: ''
        });
        fetchActiveOrders();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await patchAPI(`orders/${orderId}/status`, {
        status: newStatus
      }, auth.token);

      if (res.data.success) {
        fetchActiveOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleProcessPayment = async (orderId, paymentMethod) => {
    try {
      const res = await patchAPI(`orders/${orderId}/payment`, {
        paymentMethod: paymentMethod,
        paymentStatus: 'paid'
      }, auth.token);

      if (res.data.success) {
        alert('Payment processed successfully');
        fetchActiveOrders();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      received: '#3b82f6',
      preparing: '#f59e0b',
      ready: '#10b981',
      served: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="pos-system">
        <div className="loading-spinner">Loading POS...</div>
      </div>
    );
  }

  return (
    <div className="pos-system">
      <div className="pos-header">
        <div>
          <h2>Point of Sale</h2>
          <p className="restaurant-name">{restaurantName}</p>
        </div>
      </div>

      <div className="pos-content">
        {/* Left Side - Menu Items */}
        <div className="pos-menu-section">
          <div className="menu-controls">
            <input
              type="text"
              className="search-input"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`category-tab ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="menu-items-grid">
            {filteredMenuItems.length === 0 ? (
              <div className="empty-menu">No items available</div>
            ) : (
              filteredMenuItems.map(item => (
                <button
                  key={item.id}
                  className="menu-item-btn"
                  onClick={() => addItemToOrder(item)}
                >
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">{item.price.toLocaleString()} XAF</div>
                  {item.spicy_level > 0 && (
                    <div className="item-spicy">{'🌶️'.repeat(item.spicy_level)}</div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Current Order */}
        <div className="pos-order-section">
          <div className="order-header">
            <h3>Current Order</h3>
            <div className="order-type-selector">
              <button
                className={`type-btn ${currentOrder.orderType === 'dine_in' ? 'active' : ''}`}
                onClick={() => setCurrentOrder({ ...currentOrder, orderType: 'dine_in' })}
              >
                🍽️ Dine In
              </button>
              <button
                className={`type-btn ${currentOrder.orderType === 'takeout' ? 'active' : ''}`}
                onClick={() => setCurrentOrder({ ...currentOrder, orderType: 'takeout' })}
              >
                📦 Takeout
              </button>
              <button
                className={`type-btn ${currentOrder.orderType === 'delivery' ? 'active' : ''}`}
                onClick={() => setCurrentOrder({ ...currentOrder, orderType: 'delivery' })}
              >
                🚗 Delivery
              </button>
            </div>

            {currentOrder.orderType === 'dine_in' && (
              <input
                type="text"
                className="table-input"
                placeholder="Table number"
                value={currentOrder.tableNumber}
                onChange={(e) => setCurrentOrder({ ...currentOrder, tableNumber: e.target.value })}
              />
            )}
          </div>

          <div className="order-items">
            {currentOrder.items.length === 0 ? (
              <div className="empty-order">No items added yet</div>
            ) : (
              currentOrder.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-unit-price">{item.price.toLocaleString()} XAF</div>
                  </div>
                  <div className="item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateItemQuantity(index, -1)}
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateItemQuantity(index, 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItemFromOrder(index)}
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="item-total">
                    {(item.price * item.quantity).toLocaleString()} XAF
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="order-notes">
            <textarea
              className="notes-input"
              placeholder="Order notes (optional)"
              value={currentOrder.notes}
              onChange={(e) => setCurrentOrder({ ...currentOrder, notes: e.target.value })}
              rows="2"
            />
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="summary-value">{calculateTotal().toLocaleString()} XAF</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span className="summary-value">0 XAF</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span className="summary-value">{calculateTotal().toLocaleString()} XAF</span>
            </div>
          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={currentOrder.items.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Active Orders Section */}
      <div className="active-orders-section">
        <h3>Active Orders ({activeOrders.length})</h3>
        <div className="active-orders-grid">
          {activeOrders.length === 0 ? (
            <div className="empty-state">No active orders</div>
          ) : (
            activeOrders.map(order => (
              <div key={order.id} className="active-order-card">
                <div className="order-card-header">
                  <div className="order-number">{order.order_number}</div>
                  <span
                    className="order-status-badge"
                    style={{ background: `${getStatusColor(order.order_status)}20`, color: getStatusColor(order.order_status) }}
                  >
                    {order.order_status}
                  </span>
                </div>

                <div className="order-card-body">
                  <div className="order-info">
                    <span>Type: {order.order_type.replace('_', ' ')}</span>
                    {order.table_number && <span>Table: {order.table_number}</span>}
                  </div>

                  <div className="order-items-list">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="order-item-small">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    Total: {order.total.toLocaleString()} XAF
                  </div>
                </div>

                <div className="order-card-actions">
                  {order.order_status === 'received' && (
                    <button
                      className="status-btn preparing"
                      onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.order_status === 'preparing' && (
                    <button
                      className="status-btn ready"
                      onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.order_status === 'ready' && (
                    <button
                      className="status-btn served"
                      onClick={() => handleUpdateOrderStatus(order.id, 'served')}
                    >
                      Mark Served
                    </button>
                  )}
                  {order.order_status === 'served' && order.payment_status === 'pending' && (
                    <button
                      className="status-btn payment"
                      onClick={() => handleProcessPayment(order.id, 'cash')}
                    >
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default POSSystem;
