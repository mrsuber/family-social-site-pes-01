require('dotenv').config();
const { sequelize } = require('../config/db');
const FarmProduct = require('../models/FarmProduct');

const createFarmProductsTable = async () => {
  try {
    console.log('🔌 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('📝 Creating farm_products table...');

    // This will create the table if it doesn't exist
    // Use { force: true } to drop and recreate (WARNING: deletes all data)
    // Use { alter: true } to modify existing table structure
    await FarmProduct.sync({ alter: true });

    console.log('✅ Farm products table created/updated successfully!');

    console.log('');
    console.log('✨ FARM PRODUCTS TABLE STRUCTURE:');
    console.log('   - id (UUID, Primary Key)');
    console.log('   - sku (String, Unique - e.g., FP-HER-GAR-045)');
    console.log('   - name (String)');
    console.log('   - description (Text)');
    console.log('   - category (Enum - HERBS SPICES, GRAINS CEREALS, etc.)');
    console.log('   - subcategory (String)');
    console.log('   - retailPrice (Decimal)');
    console.log('   - bulkPrice (Decimal)');
    console.log('   - wholesalePrice (Decimal)');
    console.log('   - currency (String, default: XAF)');
    console.log('   - retailUnit (String - kg, g, L, etc.)');
    console.log('   - bulkUnit (String - bag, crate, etc.)');
    console.log('   - bulkQuantity (Decimal)');
    console.log('   - currentStock (Decimal)');
    console.log('   - minimumStock (Decimal)');
    console.log('   - maximumStock (Decimal)');
    console.log('   - reorderQuantity (Decimal)');
    console.log('   - images (Array of URLs)');
    console.log('   - primaryImage (String URL)');
    console.log('   - origin (String)');
    console.log('   - farmSource (String)');
    console.log('   - harvestSeason (String)');
    console.log('   - shelfLife (Integer - days)');
    console.log('   - storageConditions (String)');
    console.log('   - certifications (Array - Organic, Fair Trade, etc.)');
    console.log('   - nutritionalInfo (JSONB)');
    console.log('   - status (Enum - ACTIVE, INACTIVE, SEASONAL, DISCONTINUED)');
    console.log('   - stockStatus (Enum - IN STOCK, LOW STOCK, OUT OF STOCK, BACKORDERED)');
    console.log('   - tags (Array)');
    console.log('   - notes (Text)');
    console.log('   - lastRestocked (Date)');
    console.log('   - createdAt (Timestamp)');
    console.log('   - updatedAt (Timestamp)');
    console.log('');
    console.log('📊 Indexes created:');
    console.log('   - sku (unique)');
    console.log('   - category');
    console.log('   - status');
    console.log('   - stockStatus');
    console.log('   - name');
    console.log('');
    console.log('🔄 Hooks configured:');
    console.log('   - beforeSave: Auto-update stockStatus based on currentStock');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating farm products table:', error);
    process.exit(1);
  }
};

createFarmProductsTable();
