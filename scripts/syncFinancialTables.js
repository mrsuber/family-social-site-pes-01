const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: console.log
  }
);

const IncomeStream = require('../models/IncomeStream');
const RecurringExpense = require('../models/RecurringExpense');

async function syncFinancialTables() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    console.log('📊 Creating income_streams table...');
    await IncomeStream.sync({ force: false }); // Use { force: true } to drop and recreate
    console.log('✓ income_streams table ready\n');

    console.log('💸 Creating recurring_expenses table...');
    await RecurringExpense.sync({ force: false });
    console.log('✓ recurring_expenses table ready\n');

    console.log('✅ All financial tables synchronized successfully!');

    await sequelize.close();
    console.log('\n✓ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await sequelize.close();
    process.exit(1);
  }
}

syncFinancialTables();
