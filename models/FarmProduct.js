const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FarmProduct = sequelize.define('FarmProduct', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Stock Keeping Unit (e.g., FP-HER-GAR-045)'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM(
      'HERBS SPICES',
      'GRAINS CEREALS',
      'FRUITS FRESH',
      'FRUITS DRIED',
      'VEGETABLES',
      'NUTS SEEDS',
      'OILS FATS',
      'PROTEINS MEAT',
      'PROTEINS FISH',
      'DAIRY PRODUCTS',
      'BEVERAGES',
      'PROCESSED FOODS',
      'OTHER'
    ),
    allowNull: false
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'More specific categorization'
  },
  // Pricing
  retailPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Price per unit for retail'
  },
  bulkPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Price per bulk unit (e.g., per bag, per crate)'
  },
  wholesalePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Wholesale price for large orders'
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'XAF'
  },
  // Units
  retailUnit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'kg',
    comment: 'kg, g, L, ml, units, pieces, etc.'
  },
  bulkUnit: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'bag, crate, box, sack, etc.'
  },
  bulkQuantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'How many retail units in one bulk unit (e.g., 50kg per bag)'
  },
  // Stock Management
  currentStock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Current stock in retail units'
  },
  minimumStock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Reorder point'
  },
  maximumStock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Maximum stock capacity'
  },
  reorderQuantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'How much to order when restocking'
  },
  // Images
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
    comment: 'Array of image URLs'
  },
  primaryImage: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Main product image URL'
  },
  // Product Details
  origin: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Country or region of origin'
  },
  farmSource: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Name of farm or supplier'
  },
  harvestSeason: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'When this product is typically harvested'
  },
  shelfLife: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Shelf life in days'
  },
  storageConditions: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Cool, dry, refrigerated, frozen, etc.'
  },
  certifications: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    comment: 'Organic, Fair Trade, etc.'
  },
  // Nutritional Info (optional)
  nutritionalInfo: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'Calories, protein, vitamins, etc.'
  },
  // Status
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SEASONAL', 'DISCONTINUED'),
    defaultValue: 'ACTIVE'
  },
  stockStatus: {
    type: DataTypes.ENUM('IN STOCK', 'LOW STOCK', 'OUT OF STOCK', 'BACKORDERED'),
    defaultValue: 'OUT OF STOCK'
  },
  // Metadata
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    comment: 'Search tags and keywords'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Internal notes about this product'
  },
  lastRestocked: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'farm_products',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      fields: ['sku'],
      unique: true
    },
    {
      fields: ['category']
    },
    {
      fields: ['status']
    },
    {
      fields: ['stock_status']
    },
    {
      fields: ['name']
    }
  ]
});

// Hook to update stock status based on current stock
FarmProduct.addHook('beforeSave', (product) => {
  if (product.currentStock <= 0) {
    product.stockStatus = 'OUT OF STOCK';
  } else if (product.currentStock <= product.minimumStock) {
    product.stockStatus = 'LOW STOCK';
  } else {
    product.stockStatus = 'IN STOCK';
  }
});

module.exports = FarmProduct;
