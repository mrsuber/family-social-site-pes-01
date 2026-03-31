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

const revenueStreams = [
  // ACTIVE INCOME (only Abba Abdouraman)
  {
    name: 'Abba Abdouraman - Software Development Contract',
    description: 'Software development project contract. Custom application development and deployment.',
    incomeType: 'contract',
    amount: 300000, // CORRECTED: 300K XAF per month
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    clientName: 'Abba Abdouraman',
    contractDocument: '~/dev/contracts/Contract between Mohamad Siysinyuy and Abba Abdouraman  (1).pdf',
    startDate: new Date('2024-01-01'),
    notes: 'Active contract. 300,000 XAF monthly payment.',
    color: '#10b981'
  },

  // TARGET/POTENTIAL INCOME (future opportunities)
  {
    name: 'Web Development Services - Target',
    description: 'Potential recurring web development services for various clients',
    incomeType: 'recurring',
    amount: 500000, // 500K XAF per month target
    currency: 'XAF',
    frequency: 'monthly',
    status: 'inactive', // Not active yet - potential
    clientName: 'Prospective Clients',
    notes: 'Target: Monthly recurring revenue from web development, hosting, and maintenance services. Working on acquiring clients.',
    color: '#f59e0b'
  },
  {
    name: 'Software Consulting - Target',
    description: 'Potential technical consulting and advisory services',
    incomeType: 'project',
    amount: 800000, // 800K XAF target
    currency: 'XAF',
    frequency: 'monthly',
    status: 'inactive', // Not active yet - potential
    clientName: 'Enterprise Clients (Target)',
    notes: 'Target: Consulting services for enterprise software architecture, system design, and technical advisory. Actively pursuing.',
    color: '#f59e0b'
  },
  {
    name: 'Mobile App Development - Target Project',
    description: 'Potential mobile app development project',
    incomeType: 'project',
    amount: 3000000, // 3M XAF
    currency: 'XAF',
    frequency: 'one-time',
    status: 'inactive', // Not confirmed yet
    clientName: 'Prospective Client',
    notes: 'Target: Mobile app development project. One-time payment upon completion. In discussion phase.',
    color: '#f59e0b'
  },
  {
    name: 'SaaS Subscription Revenue - Target',
    description: 'Future SaaS product subscription revenue goal',
    incomeType: 'recurring',
    amount: 1200000, // 1.2M XAF per month target
    currency: 'XAF',
    frequency: 'monthly',
    status: 'inactive', // Not launched yet
    clientName: 'Future Customers',
    notes: 'Target: Monthly recurring revenue from SaaS product once launched. Product currently in development.',
    color: '#f59e0b'
  }
];

async function restoreRevenue() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    // Get General 0
    const general0 = await General.findOne({
      where: { orderNumber: 0 }
    });

    if (!general0) {
      console.error('✗ General 0 not found!');
      process.exit(1);
    }

    // Delete existing revenue
    await IncomeStream.destroy({
      where: {},
      truncate: true
    });

    console.log('✓ Cleared existing revenue streams\n');
    console.log('💰 Adding revenue streams...\n');

    let activeRevenue = 0;
    let targetRevenue = 0;

    for (const revenueData of revenueStreams) {
      revenueData.generalId = general0.id;
      const revenue = await IncomeStream.create(revenueData);

      const amount = parseFloat(revenue.amount);

      if (revenue.status === 'active') {
        if (revenue.frequency === 'monthly' || revenue.frequency === 'recurring') {
          activeRevenue += amount;
        }
        console.log(`  ✅ ACTIVE: ${revenue.name}`);
        console.log(`     Amount: ${(amount / 1000).toFixed(0)}K XAF/month`);
        console.log(`     Client: ${revenue.clientName}`);
        console.log(`     Status: Green animated connection`);
      } else {
        if (revenue.frequency === 'monthly' || revenue.frequency === 'recurring') {
          targetRevenue += amount;
        }
        console.log(`  🎯 TARGET: ${revenue.name}`);
        console.log(`     Amount: ${(amount / 1000).toFixed(0)}K XAF${revenue.frequency === 'one-time' ? '' : '/month'}`);
        console.log(`     Client: ${revenue.clientName}`);
        console.log(`     Status: Grayed out (potential)`);
      }
      console.log('');
    }

    console.log('✅ Successfully restored all revenue streams!\n');
    console.log('📊 Revenue Summary:');
    console.log(`  ✅ Active Income: 1 stream = ${(activeRevenue / 1000).toFixed(0)}K XAF/month`);
    console.log(`  🎯 Target Income: 4 streams = ${(targetRevenue / 1000).toFixed(0)}K XAF/month potential`);
    console.log(`  📈 Total Potential: ${((activeRevenue + targetRevenue) / 1000).toFixed(0)}K XAF/month`);

    console.log('\n📊 Current Financial Position:');
    const monthlyExpenses = 313.6;
    console.log(`  💰 Active Revenue: ${(activeRevenue / 1000).toFixed(1)}K XAF/month`);
    console.log(`  💸 Monthly Expenses: ${monthlyExpenses}K XAF`);
    const currentProfit = (activeRevenue / 1000) - monthlyExpenses;
    if (currentProfit >= 0) {
      console.log(`  ✅ Current Profit: +${currentProfit.toFixed(1)}K XAF/month`);
    } else {
      console.log(`  ⚠️  Current Loss: ${currentProfit.toFixed(1)}K XAF/month`);
    }

    console.log('\n🎯 If All Targets Achieved:');
    const potentialProfit = ((activeRevenue + targetRevenue) / 1000) - monthlyExpenses;
    console.log(`  💰 Potential Revenue: ${((activeRevenue + targetRevenue) / 1000).toFixed(0)}K XAF/month`);
    console.log(`  ✅ Potential Profit: +${potentialProfit.toFixed(0)}K XAF/month`);
    console.log(`  📅 Potential Yearly Profit: +${(potentialProfit * 12 / 1000).toFixed(2)}M XAF`);

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

restoreRevenue();
