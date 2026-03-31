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
const General = require('../models/General');

// Revenue streams to add
const revenueStreams = [
  {
    name: 'Abba Abdouraman - Software Development Contract',
    description: 'Software development project contract. Custom application development and deployment.',
    incomeType: 'contract',
    amount: 2400000, // 2.4M XAF - UPDATE THIS WITH ACTUAL CONTRACT VALUE
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    clientName: 'Abba Abdouraman',
    contractDocument: '~/dev/contracts/Contract between Mohamad Siysinyuy and Abba Abdouraman  (1).pdf',
    startDate: new Date('2024-01-01'), // UPDATE WITH ACTUAL START DATE
    notes: 'Software development contract. Monthly recurring revenue from ongoing development and maintenance work.',
    color: '#10b981'
  },
  {
    name: 'Web Development Services',
    description: 'General web development and consulting services for various clients',
    incomeType: 'recurring',
    amount: 500000, // 500K XAF per month
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    clientName: 'Various Clients',
    notes: 'Monthly recurring revenue from web development, hosting, and maintenance services for multiple clients.',
    color: '#10b981'
  },
  {
    name: 'Software Consulting',
    description: 'Technical consulting and advisory services',
    incomeType: 'project',
    amount: 800000, // 800K XAF
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    clientName: 'Enterprise Clients',
    notes: 'Consulting services for enterprise software architecture, system design, and technical advisory.',
    color: '#10b981'
  },
  // Potential/Target Revenue (not active yet - marked as inactive)
  {
    name: 'Mobile App Development - Target Project',
    description: 'Upcoming mobile app development project',
    incomeType: 'project',
    amount: 3000000, // 3M XAF
    currency: 'XAF',
    frequency: 'one-time',
    status: 'inactive',
    clientName: 'Prospective Client',
    notes: 'Target project for mobile app development. Not yet confirmed. Would be one-time payment upon completion.',
    color: '#f59e0b'
  },
  {
    name: 'SaaS Subscription Revenue - Target',
    description: 'Future SaaS product subscription revenue',
    incomeType: 'recurring',
    amount: 1200000, // 1.2M XAF per month target
    currency: 'XAF',
    frequency: 'monthly',
    status: 'inactive',
    clientName: 'Future Customers',
    notes: 'Target monthly recurring revenue from SaaS product once launched. Currently in development.',
    color: '#f59e0b'
  }
];

async function addRevenue() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    // Get General 0 (Technology)
    const general0 = await General.findOne({
      where: { orderNumber: 0 }
    });

    if (!general0) {
      console.error('✗ General 0 not found!');
      process.exit(1);
    }

    console.log(`✓ Found General 0: ${general0.name} (ID: ${general0.id})\n`);

    console.log('💰 Adding revenue streams...\n');

    let activeRevenue = 0;
    let targetRevenue = 0;
    let activeCount = 0;
    let inactiveCount = 0;

    for (const revenueData of revenueStreams) {
      // Assign to General 0 (Technology)
      revenueData.generalId = general0.id;

      const revenue = await IncomeStream.create(revenueData);

      const amount = parseFloat(revenue.amount);

      if (revenue.status === 'active') {
        activeCount++;
        if (revenue.frequency === 'monthly' || revenue.frequency === 'recurring') {
          activeRevenue += amount;
        }
        console.log(`  ✓ ACTIVE: ${revenue.name}`);
      } else {
        inactiveCount++;
        if (revenue.frequency === 'monthly' || revenue.frequency === 'recurring') {
          targetRevenue += amount;
        }
        console.log(`  → TARGET: ${revenue.name}`);
      }

      console.log(`    Client: ${revenue.clientName}`);
      console.log(`    Amount: ${(amount / 1000).toFixed(0)}K XAF ${revenue.frequency}`);
      console.log(`    Type: ${revenue.incomeType}`);
      console.log(`    Status: ${revenue.status}`);
      console.log('');
    }

    console.log('✅ Successfully added all revenue streams!\n');
    console.log('💰 Revenue Summary:');
    console.log(`  📊 Active Income Streams: ${activeCount}`);
    console.log(`  📊 Target Income Streams: ${inactiveCount}`);
    console.log(`  📊 Monthly Active Revenue: ${(activeRevenue / 1000).toFixed(0)}K XAF (${(activeRevenue / 1000000).toFixed(2)}M XAF)`);
    console.log(`  📊 Monthly Target Revenue: ${(targetRevenue / 1000).toFixed(0)}K XAF (${(targetRevenue / 1000000).toFixed(2)}M XAF)`);
    console.log(`  📊 Total Potential Monthly: ${((activeRevenue + targetRevenue) / 1000000).toFixed(2)}M XAF`);

    console.log('\n📊 Financial Position:');
    const monthlyExpenses = 313600; // From previous calculation
    const monthlyProfit = activeRevenue - monthlyExpenses;

    console.log(`  💸 Monthly Expenses: ${(monthlyExpenses / 1000).toFixed(0)}K XAF`);
    console.log(`  💰 Monthly Active Revenue: ${(activeRevenue / 1000).toFixed(0)}K XAF`);
    if (monthlyProfit > 0) {
      console.log(`  ✅ Monthly Profit: +${(monthlyProfit / 1000).toFixed(0)}K XAF (${(monthlyProfit / 1000000).toFixed(2)}M XAF)`);
    } else {
      console.log(`  ⚠️  Monthly Loss: ${(monthlyProfit / 1000).toFixed(0)}K XAF (${(monthlyProfit / 1000000).toFixed(2)}M XAF)`);
    }

    if (activeRevenue + targetRevenue > monthlyExpenses) {
      const potentialProfit = (activeRevenue + targetRevenue) - monthlyExpenses;
      console.log(`  🎯 Potential Monthly Profit (if all targets achieved): +${(potentialProfit / 1000).toFixed(0)}K XAF (${(potentialProfit / 1000000).toFixed(2)}M XAF)`);
    }

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

addRevenue();
