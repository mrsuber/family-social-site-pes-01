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

const RecurringExpense = require('../models/RecurringExpense');
const PhysicalAsset = require('../models/PhysicalAsset');

// USD to XAF conversion rate
const USD_TO_XAF = 600;

const expenses = [
  // Monthly Expenses
  {
    name: 'Starlink Internet',
    description: 'High-speed satellite internet - Primary connection for operations',
    category: 'utilities',
    amount: 60000,
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    provider: 'Starlink',
    isEssential: true,
    dueDay: 10,
    startDate: new Date('2023-03-10'),
    notes: 'Critical for business operations. Monthly subscription for high-speed satellite internet.'
  },
  {
    name: 'Electricity',
    description: 'Office electricity/power supply',
    category: 'utilities',
    amount: 10000,
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    provider: 'ENEO',
    isEssential: true,
    dueDay: 5,
    notes: 'Essential utility for office operations'
  },
  {
    name: 'Office Rent',
    description: 'Monthly office space rental',
    category: 'rent',
    amount: 170000,
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    isEssential: true,
    dueDay: 1,
    notes: 'Office workspace rental - largest monthly expense'
  },
  {
    name: 'Water Supply',
    description: 'Office water utility',
    category: 'utilities',
    amount: 10000,
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    provider: 'CDE/CAMWATER',
    isEssential: true,
    dueDay: 5,
    notes: 'Monthly water utility'
  },
  {
    name: 'Claude AI Pro - Account 1',
    description: 'Claude AI Pro subscription for development and AI assistance',
    category: 'software',
    amount: 20 * USD_TO_XAF, // $20 in XAF
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    provider: 'Anthropic',
    isEssential: true,
    dueDay: 15,
    notes: 'Claude AI Pro subscription - $20/month. Critical for development work.'
  },
  {
    name: 'Claude AI Pro - Account 2',
    description: 'Claude AI Pro subscription (second account) for development',
    category: 'software',
    amount: 20 * USD_TO_XAF, // $20 in XAF
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    provider: 'Anthropic',
    isEssential: true,
    dueDay: 15,
    notes: 'Claude AI Pro subscription - $20/month. Second account for team.'
  },

  // Annual Expenses (converted to monthly equivalent)
  {
    name: 'VPS Hosting',
    description: 'Virtual Private Server hosting for applications',
    category: 'hosting',
    amount: 371.88 * USD_TO_XAF, // $371.88 yearly
    currency: 'XAF',
    frequency: 'yearly',
    status: 'active',
    provider: 'VPS Provider',
    isEssential: true,
    startDate: new Date('2024-01-01'),
    notes: 'Annual VPS hosting cost - $371.88/year. Hosts family-social, subercraftex, and other applications.'
  },
  {
    name: 'Namecheap Domain & Services',
    description: 'Domain registration and related services',
    category: 'hosting',
    amount: 120 * USD_TO_XAF, // $120 yearly
    currency: 'XAF',
    frequency: 'yearly',
    status: 'active',
    provider: 'Namecheap',
    isEssential: true,
    startDate: new Date('2024-01-01'),
    notes: 'Annual domain and hosting services - $120/year. Covers multiple domains.'
  },
  {
    name: 'MTN Home Box Data',
    description: 'Backup internet data subscription',
    category: 'utilities',
    amount: 15000, // Estimated monthly data cost
    currency: 'XAF',
    frequency: 'monthly',
    status: 'active',
    provider: 'MTN',
    isEssential: false,
    dueDay: 20,
    notes: 'Backup internet for when Starlink has issues. Optional but recommended.'
  }
];

async function addExpenses() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    // Find Starlink asset to link subscription
    const starlinkAsset = await PhysicalAsset.findOne({
      where: { name: { [Sequelize.Op.like]: '%Starlink%' } }
    });

    console.log('📝 Adding recurring expenses...\n');

    let totalMonthly = 0;
    let totalYearly = 0;

    for (const expenseData of expenses) {
      // Link Starlink expense to Starlink asset
      if (expenseData.name === 'Starlink Internet' && starlinkAsset) {
        expenseData.assetId = starlinkAsset.id;
      }

      const expense = await RecurringExpense.create(expenseData);

      const monthlyAmount = parseFloat(expense.monthlyEquivalent);
      totalMonthly += monthlyAmount;

      if (expense.frequency === 'monthly') {
        totalYearly += monthlyAmount * 12;
      } else if (expense.frequency === 'yearly') {
        totalYearly += parseFloat(expense.amount);
      }

      console.log(`  ✓ Added: ${expense.name}`);
      console.log(`    Category: ${expense.category}`);
      console.log(`    Amount: ${(parseFloat(expense.amount) / 1000).toFixed(1)}K XAF ${expense.frequency}`);
      console.log(`    Monthly equivalent: ${(monthlyAmount / 1000).toFixed(1)}K XAF`);
      console.log(`    Essential: ${expense.isEssential ? 'Yes' : 'No'}`);
      console.log('');
    }

    console.log('✅ Successfully added all recurring expenses!\n');
    console.log('💰 Financial Summary:');
    console.log(`  📊 Total Monthly Expenses: ${(totalMonthly / 1000).toFixed(1)}K XAF (${(totalMonthly / 1000000).toFixed(2)}M XAF)`);
    console.log(`  📊 Total Yearly Expenses: ${(totalYearly / 1000).toFixed(1)}K XAF (${(totalYearly / 1000000).toFixed(2)}M XAF)`);
    console.log(`  📊 Average Daily Cost: ${(totalMonthly / 30 / 1000).toFixed(1)}K XAF`);

    console.log('\n📋 Breakdown by Category:');
    const categories = await RecurringExpense.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('monthly_equivalent')), 'total']
      ],
      group: ['category'],
      raw: true
    });

    categories.forEach(cat => {
      console.log(`  ${cat.category}: ${cat.count} items, ${(parseFloat(cat.total) / 1000).toFixed(1)}K XAF/month`);
    });

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

addExpenses();
