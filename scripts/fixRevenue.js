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
    logging: false
  }
);

const IncomeStream = require('../models/IncomeStream');

async function fixRevenue() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    // Delete ALL existing revenue streams
    const deleted = await IncomeStream.destroy({
      where: {},
      truncate: true
    });

    console.log(`✓ Deleted ${deleted || 'all'} existing revenue streams\n`);

    // Add only the correct Abba Abdouraman contract
    const abbaContract = await IncomeStream.create({
      name: 'Abba Abdouraman - Software Development Contract',
      description: 'Software development project contract. Custom application development and deployment.',
      incomeType: 'contract',
      amount: 300000, // 300K XAF per month
      currency: 'XAF',
      frequency: 'monthly',
      status: 'active',
      clientName: 'Abba Abdouraman',
      contractDocument: '~/dev/contracts/Contract between Mohamad Siysinyuy and Abba Abdouraman  (1).pdf',
      startDate: new Date('2024-01-01'),
      notes: 'Software development contract. 300,000 XAF monthly payment.',
      color: '#10b981'
    });

    console.log('✅ Revenue stream corrected!\n');
    console.log('💰 Current Revenue:');
    console.log(`  ✓ ${abbaContract.name}`);
    console.log(`    Amount: ${(abbaContract.amount / 1000).toFixed(0)}K XAF/month`);
    console.log(`    Client: ${abbaContract.clientName}`);
    console.log(`    Status: ${abbaContract.status}`);

    console.log('\n📊 Accurate Financial Position:');
    const monthlyRevenue = 300000; // 300K XAF
    const monthlyExpenses = 313600; // 313.6K XAF
    const monthlyProfit = monthlyRevenue - monthlyExpenses;

    console.log(`  💰 Monthly Revenue: ${(monthlyRevenue / 1000).toFixed(1)}K XAF`);
    console.log(`  💸 Monthly Expenses: ${(monthlyExpenses / 1000).toFixed(1)}K XAF`);

    if (monthlyProfit >= 0) {
      console.log(`  ✅ Monthly Profit: +${(monthlyProfit / 1000).toFixed(1)}K XAF`);
    } else {
      console.log(`  ⚠️  Monthly Loss: ${(monthlyProfit / 1000).toFixed(1)}K XAF`);
      console.log(`\n  📌 Note: Currently operating at a small loss of ${Math.abs(monthlyProfit / 1000).toFixed(1)}K XAF/month`);
      console.log(`  📌 Need additional ${Math.abs(monthlyProfit / 1000).toFixed(1)}K XAF/month to break even`);
    }

    console.log(`\n  📅 Yearly Projection:`);
    console.log(`    Revenue: ${(monthlyRevenue * 12 / 1000000).toFixed(2)}M XAF`);
    console.log(`    Expenses: ${(monthlyExpenses * 12 / 1000000).toFixed(2)}M XAF`);
    console.log(`    Net: ${(monthlyProfit * 12 / 1000).toFixed(0)}K XAF`);

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

fixRevenue();
