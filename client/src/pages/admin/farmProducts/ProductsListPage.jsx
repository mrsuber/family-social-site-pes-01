import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ProductsListPage.css';

const ProductsListPage = () => {
  const history = useHistory();
  const { auth } = useSelector(state => state);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockStatus: '',
    search: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.stockStatus) params.append('stockStatus', filters.stockStatus);
      if (filters.search) params.append('search', filters.search);

      const res = await axios.get(`/api/farm-products/products?${params.toString()}`, {
        headers: { Authorization: auth.token }
      });

      setProducts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setMessage({ type: 'error', text: 'Failed to load products' });
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    setLoading(true);
    fetchProducts();
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(`/api/farm-products/products/${id}`, {
        headers: { Authorization: auth.token }
      });

      setMessage({ type: 'success', text: 'Product deleted successfully' });
      fetchProducts();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to delete product'
      });
    }
  };

  const getStockBadgeClass = (status) => {
    const classes = {
      'IN STOCK': 'badge-in-stock',
      'LOW STOCK': 'badge-low-stock',
      'OUT OF STOCK': 'badge-out-stock',
      'BACKORDERED': 'badge-backorder'
    };
    return classes[status] || 'badge-default';
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'ACTIVE': 'status-active',
      'INACTIVE': 'status-inactive',
      'SEASONAL': 'status-seasonal',
      'DISCONTINUED': 'status-discontinued'
    };
    return classes[status] || 'status-default';
  };

  if (loading) {
    return <div className="products-list-loading">Loading products...</div>;
  }

  return (
    <div className="products-list-page">
      <div className="page-header">
        <h1>Farm Products Management</h1>
        <button
          onClick={() => history.push('/admin/farm-products/new')}
          className="btn-add-product"
        >
          + Add New Product
        </button>
      </div>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="filters-section card">
        <h2>Filters</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name or SKU..."
            />
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="HERBS SPICES">Herbs & Spices</option>
              <option value="GRAINS CEREALS">Grains & Cereals</option>
              <option value="FRUITS FRESH">Fruits (Fresh)</option>
              <option value="FRUITS DRIED">Fruits (Dried)</option>
              <option value="VEGETABLES">Vegetables</option>
              <option value="NUTS SEEDS">Nuts & Seeds</option>
              <option value="OILS FATS">Oils & Fats</option>
              <option value="PROTEINS MEAT">Proteins (Meat)</option>
              <option value="PROTEINS FISH">Proteins (Fish)</option>
              <option value="DAIRY PRODUCTS">Dairy Products</option>
              <option value="BEVERAGES">Beverages</option>
              <option value="PROCESSED FOODS">Processed Foods</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SEASONAL">Seasonal</option>
              <option value="DISCONTINUED">Discontinued</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Stock Status</label>
            <select name="stockStatus" value={filters.stockStatus} onChange={handleFilterChange}>
              <option value="">All Stock Levels</option>
              <option value="IN STOCK">In Stock</option>
              <option value="LOW STOCK">Low Stock</option>
              <option value="OUT OF STOCK">Out of Stock</option>
              <option value="BACKORDERED">Backordered</option>
            </select>
          </div>

          <div className="filter-actions">
            <button onClick={handleSearch} className="btn-filter">
              Apply Filters
            </button>
            <button
              onClick={() => {
                setFilters({ category: '', status: '', stockStatus: '', search: '' });
                setTimeout(fetchProducts, 100);
              }}
              className="btn-clear"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="products-section">
        <div className="products-header">
          <h2>Products ({products.length})</h2>
        </div>

        {products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image">
                  {product.primaryImage || product.images?.[0] ? (
                    <img
                      src={product.primaryImage || product.images[0]}
                      alt={product.name}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-sku">SKU: {product.sku} • {product.category}</p>

                  <div className="product-pricing">
                    <div className="price-item">
                      <span className="price-label">Retail Price</span>
                      <span className="price-value">
                        {Number(product.retailPrice).toLocaleString()} XAF/{product.retailUnit}
                      </span>
                    </div>
                    {product.bulkPrice && (
                      <div className="price-item">
                        <span className="price-label">Bulk Price</span>
                        <span className="price-value">
                          {Number(product.bulkPrice).toLocaleString()} XAF/{product.bulkUnit}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="product-stock-info">
                    <span className="stock-label">Stock</span>
                    <span className="stock-value">
                      {product.currentStock} {product.retailUnit}
                    </span>
                  </div>
                </div>

                <div className="product-meta">
                  <div className="badges">
                    <span className={`stock-badge ${getStockBadgeClass(product.stockStatus)}`}>
                      {product.stockStatus}
                    </span>
                    <span className={`status-badge ${getStatusBadgeClass(product.status)}`}>
                      {product.status}
                    </span>
                  </div>

                  <div className="product-actions">
                    <button
                      onClick={() => history.push(`/admin/farm-products/${product.id}`)}
                      className="btn-view"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="btn-delete"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;
