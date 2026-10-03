import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ProductEditPage.css';

const ProductEditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { auth } = useSelector(state => state);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: 'HERBS SPICES',
    retailPrice: '',
    bulkPrice: '',
    retailUnit: 'kg',
    bulkUnit: 'bag',
    bulkQuantity: '',
    currentStock: '',
    minimumStock: '',
    origin: '',
    status: 'ACTIVE'
  });

  // Image upload state
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Stock update state
  const [stockOperation, setStockOperation] = useState('add');
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockNotes, setStockNotes] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/farm-products/products/${id}`, {
        headers: { Authorization: auth.token }
      });
      const productData = res.data.data;
      setProduct(productData);
      setFormData({
        name: productData.name || '',
        sku: productData.sku || '',
        description: productData.description || '',
        category: productData.category || 'HERBS SPICES',
        retailPrice: productData.retailPrice || '',
        bulkPrice: productData.bulkPrice || '',
        retailUnit: productData.retailUnit || 'kg',
        bulkUnit: productData.bulkUnit || 'bag',
        bulkQuantity: productData.bulkQuantity || '',
        currentStock: productData.currentStock || '',
        minimumStock: productData.minimumStock || '',
        origin: productData.origin || '',
        status: productData.status || 'ACTIVE'
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching product:', err);
      setMessage({ type: 'error', text: 'Failed to load product' });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.put(
        `/api/farm-products/products/${id}`,
        formData,
        {
          headers: { Authorization: auth.token }
        }
      );

      setMessage({ type: 'success', text: 'Product updated successfully!' });
      setProduct(res.data.data);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to update product'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setMessage({ type: 'error', text: 'Maximum 10 images allowed' });
      return;
    }
    setSelectedImages(files);
  };

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      setMessage({ type: 'error', text: 'Please select images to upload' });
      return;
    }

    setUploadingImages(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      const res = await axios.post(
        `/api/farm-products/products/${id}/images`,
        formData,
        {
          headers: {
            Authorization: auth.token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMessage({ type: 'success', text: 'Images uploaded successfully!' });
      setSelectedImages([]);
      fetchProduct(); // Refresh product data
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to upload images'
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      await axios.delete(`/api/farm-products/products/${id}/images`, {
        headers: { Authorization: auth.token },
        data: { imageUrl }
      });

      setMessage({ type: 'success', text: 'Image deleted successfully!' });
      fetchProduct(); // Refresh product data
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to delete image'
      });
    }
  };

  const handleSetPrimaryImage = async (imageUrl) => {
    try {
      await axios.patch(
        `/api/farm-products/products/${id}/primary-image`,
        { imageUrl },
        {
          headers: { Authorization: auth.token }
        }
      );

      setMessage({ type: 'success', text: 'Primary image updated!' });
      fetchProduct(); // Refresh product data
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to set primary image'
      });
    }
  };

  const handleStockUpdate = async (e) => {
    e.preventDefault();

    if (!stockQuantity || parseFloat(stockQuantity) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid quantity' });
      return;
    }

    try {
      const res = await axios.patch(
        `/api/farm-products/products/${id}/stock`,
        {
          quantity: parseFloat(stockQuantity),
          operation: stockOperation,
          notes: stockNotes
        },
        {
          headers: { Authorization: auth.token }
        }
      );

      setMessage({
        type: 'success',
        text: `Stock ${stockOperation === 'add' ? 'increased' : 'decreased'} successfully!`
      });
      setStockQuantity('');
      setStockNotes('');
      fetchProduct(); // Refresh product data
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to update stock'
      });
    }
  };

  if (loading) {
    return <div className="product-edit-loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="product-edit-error">Product not found</div>;
  }

  return (
    <div className="product-edit-page">
      <div className="product-edit-header">
        <button onClick={() => history.push('/admin/farm-products')} className="btn-back">
          ← Back to Products
        </button>
        <h1>Edit Product</h1>
      </div>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="product-edit-grid">
        {/* Left Column - Product Images */}
        <div className="product-images-section card">
          <h2>Product Images</h2>

          <div className="current-images">
            {product.images && product.images.length > 0 ? (
              <div className="images-grid">
                {product.images.map((img, index) => (
                  <div key={index} className="image-item">
                    <img src={img} alt={`Product ${index + 1}`} />
                    <div className="image-actions">
                      {product.primaryImage === img ? (
                        <span className="primary-badge">Primary</span>
                      ) : (
                        <button
                          onClick={() => handleSetPrimaryImage(img)}
                          className="btn-set-primary"
                        >
                          Set as Primary
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteImage(img)}
                        className="btn-delete-img"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-images">No images uploaded yet</p>
            )}
          </div>

          <div className="upload-images-form">
            <h3>Upload New Images</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="file-input"
            />
            {selectedImages.length > 0 && (
              <div className="selected-images-info">
                <p>{selectedImages.length} image(s) selected</p>
                <ul>
                  {selectedImages.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={handleImageUpload}
              disabled={selectedImages.length === 0 || uploadingImages}
              className="btn-upload"
            >
              {uploadingImages ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>
        </div>

        {/* Middle Column - Product Details */}
        <div className="product-details-section card">
          <h2>Product Details</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
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

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Retail Price (XAF) *</label>
                <input
                  type="number"
                  name="retailPrice"
                  value={formData.retailPrice}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Retail Unit *</label>
                <input
                  type="text"
                  name="retailUnit"
                  value={formData.retailUnit}
                  onChange={handleChange}
                  placeholder="kg"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bulk Price (XAF)</label>
                <input
                  type="number"
                  name="bulkPrice"
                  value={formData.bulkPrice}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Bulk Unit</label>
                <input
                  type="text"
                  name="bulkUnit"
                  value={formData.bulkUnit}
                  onChange={handleChange}
                  placeholder="bag"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g., Cameroon, Nigeria"
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="SEASONAL">Seasonal</option>
                <option value="DISCONTINUED">Discontinued</option>
              </select>
            </div>

            <button type="submit" disabled={saving} className="btn-save">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Right Column - Stock Management */}
        <div className="stock-management-section card">
          <h2>Stock Management</h2>

          <div className="current-stock-info">
            <div className="stock-stat">
              <span className="stock-label">Current Stock:</span>
              <span className="stock-value">{product.currentStock} {product.retailUnit}</span>
            </div>
            <div className="stock-stat">
              <span className="stock-label">Status:</span>
              <span className={`stock-status status-${product.stockStatus.toLowerCase().replace(' ', '-')}`}>
                {product.stockStatus}
              </span>
            </div>
            <div className="stock-stat">
              <span className="stock-label">Minimum Stock:</span>
              <span className="stock-value">{product.minimumStock} {product.retailUnit}</span>
            </div>
            {product.lastRestocked && (
              <div className="stock-stat">
                <span className="stock-label">Last Restocked:</span>
                <span className="stock-value">
                  {new Date(product.lastRestocked).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleStockUpdate} className="stock-update-form">
            <h3>Update Stock</h3>

            <div className="form-group">
              <label>Operation</label>
              <select
                value={stockOperation}
                onChange={(e) => setStockOperation(e.target.value)}
              >
                <option value="add">Add Stock (New Shipment)</option>
                <option value="subtract">Subtract Stock (Sale/Loss)</option>
                <option value="set">Set Stock (Manual Count)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity ({product.retailUnit})</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                step="0.01"
                placeholder={stockOperation === 'set' ? 'New total quantity' : 'Quantity to ' + stockOperation}
              />
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                value={stockNotes}
                onChange={(e) => setStockNotes(e.target.value)}
                rows="2"
                placeholder="e.g., New shipment from supplier, inventory count, etc."
              />
            </div>

            <button type="submit" className="btn-update-stock">
              Update Stock
            </button>
          </form>

          {stockOperation === 'add' && stockQuantity && (
            <div className="stock-preview">
              <p>
                New stock will be: <strong>{parseFloat(product.currentStock) + parseFloat(stockQuantity || 0)} {product.retailUnit}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
