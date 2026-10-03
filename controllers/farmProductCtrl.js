const FarmProduct = require('../models/FarmProduct');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

const farmProductCtrl = {
  // Get all products with optional filters
  getAllProducts: async (req, res) => {
    try {
      const { category, status, stockStatus, search } = req.query;

      let where = {};

      if (category) where.category = category;
      if (status) where.status = status;
      if (stockStatus) where.stockStatus = stockStatus;
      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { sku: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const products = await FarmProduct.findAll({
        where,
        order: [['name', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (err) {
      console.error('Get all products error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Get single product by ID
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (err) {
      console.error('Get product error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Create new product
  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      // Check if SKU already exists
      const existing = await FarmProduct.findOne({ where: { sku: productData.sku } });
      if (existing) {
        return res.status(400).json({ msg: 'SKU already exists' });
      }

      const product = await FarmProduct.create(productData);

      res.status(201).json({
        success: true,
        msg: 'Product created successfully',
        data: product
      });
    } catch (err) {
      console.error('Create product error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // If SKU is being updated, check for duplicates
      if (updates.sku && updates.sku !== product.sku) {
        const existing = await FarmProduct.findOne({ where: { sku: updates.sku } });
        if (existing) {
          return res.status(400).json({ msg: 'SKU already exists' });
        }
      }

      await product.update(updates);

      res.status(200).json({
        success: true,
        msg: 'Product updated successfully',
        data: product
      });
    } catch (err) {
      console.error('Update product error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Upload product images
  uploadProductImages: async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msg: 'No images uploaded' });
      }

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Get image URLs
      const imageUrls = req.files.map(file => `/uploads/photos/${file.filename}`);

      // Add to existing images
      const currentImages = product.images || [];
      const updatedImages = [...currentImages, ...imageUrls];

      // Set first image as primary if not set
      const primaryImage = product.primaryImage || imageUrls[0];

      await product.update({
        images: updatedImages,
        primaryImage
      });

      res.status(200).json({
        success: true,
        msg: 'Images uploaded successfully',
        data: {
          images: updatedImages,
          primaryImage
        }
      });
    } catch (err) {
      console.error('Upload images error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete product image
  deleteProductImage: async (req, res) => {
    try {
      const { id } = req.params;
      const { imageUrl } = req.body;

      if (!imageUrl) {
        return res.status(400).json({ msg: 'Image URL is required' });
      }

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Remove from images array
      const updatedImages = (product.images || []).filter(img => img !== imageUrl);

      // If deleted image was primary, set new primary
      let newPrimaryImage = product.primaryImage;
      if (product.primaryImage === imageUrl) {
        newPrimaryImage = updatedImages[0] || null;
      }

      // Delete file from disk
      const filePath = path.join(__dirname, '..', imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await product.update({
        images: updatedImages,
        primaryImage: newPrimaryImage
      });

      res.status(200).json({
        success: true,
        msg: 'Image deleted successfully',
        data: {
          images: updatedImages,
          primaryImage: newPrimaryImage
        }
      });
    } catch (err) {
      console.error('Delete image error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Set primary image
  setPrimaryImage: async (req, res) => {
    try {
      const { id } = req.params;
      const { imageUrl } = req.body;

      if (!imageUrl) {
        return res.status(400).json({ msg: 'Image URL is required' });
      }

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Verify image exists in product images
      if (!product.images || !product.images.includes(imageUrl)) {
        return res.status(400).json({ msg: 'Image not found in product images' });
      }

      await product.update({ primaryImage: imageUrl });

      res.status(200).json({
        success: true,
        msg: 'Primary image updated',
        data: { primaryImage: imageUrl }
      });
    } catch (err) {
      console.error('Set primary image error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Update stock
  updateStock: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, operation, notes } = req.body;

      if (!quantity || !operation) {
        return res.status(400).json({ msg: 'Quantity and operation (add/subtract/set) are required' });
      }

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      let newStock = parseFloat(product.currentStock);
      const qty = parseFloat(quantity);

      switch (operation) {
        case 'add':
          newStock += qty;
          break;
        case 'subtract':
          newStock = Math.max(0, newStock - qty);
          break;
        case 'set':
          newStock = qty;
          break;
        default:
          return res.status(400).json({ msg: 'Invalid operation. Use add, subtract, or set' });
      }

      const updates = {
        currentStock: newStock,
        lastRestocked: operation === 'add' ? new Date() : product.lastRestocked
      };

      if (notes) {
        updates.notes = notes;
      }

      await product.update(updates);

      res.status(200).json({
        success: true,
        msg: 'Stock updated successfully',
        data: {
          previousStock: parseFloat(product.currentStock),
          newStock,
          stockStatus: product.stockStatus
        }
      });
    } catch (err) {
      console.error('Update stock error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Get low stock products
  getLowStockProducts: async (req, res) => {
    try {
      const products = await FarmProduct.findAll({
        where: {
          stockStatus: 'LOW STOCK',
          status: 'ACTIVE'
        },
        order: [['currentStock', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (err) {
      console.error('Get low stock products error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Get out of stock products
  getOutOfStockProducts: async (req, res) => {
    try {
      const products = await FarmProduct.findAll({
        where: {
          stockStatus: 'OUT OF STOCK',
          status: 'ACTIVE'
        },
        order: [['name', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (err) {
      console.error('Get out of stock products error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await FarmProduct.findByPk(id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Delete all product images from disk
      if (product.images && product.images.length > 0) {
        product.images.forEach(imageUrl => {
          const filePath = path.join(__dirname, '..', imageUrl);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }

      await product.destroy();

      res.status(200).json({
        success: true,
        msg: 'Product deleted successfully'
      });
    } catch (err) {
      console.error('Delete product error:', err);
      res.status(500).json({ msg: err.message });
    }
  },

  // Get products by category
  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      const products = await FarmProduct.findAll({
        where: { category },
        order: [['name', 'ASC']]
      });

      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (err) {
      console.error('Get products by category error:', err);
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = farmProductCtrl;
