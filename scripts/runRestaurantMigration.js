const { sequelize } = require('../config/db');
const migration = require('../migrations/createRestaurantSystemTables');

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('\n🔄 Running Restaurant System migration...');

    const queryInterface = sequelize.getQueryInterface();
    await migration.up(queryInterface, sequelize.Sequelize);

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Restaurant System Tables Created:');
    console.log('   1. suppliers');
    console.log('   2. restaurants');
    console.log('   3. inventory_items');
    console.log('   4. menu_items');
    console.log('   5. restaurant_orders');
    console.log('\n📝 Indexes created for optimal query performance');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
