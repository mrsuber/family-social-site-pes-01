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

async function optimizeExpenses() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    console.log('💰 EXPENSE OPTIMIZATION PLAN\n');
    console.log('📊 Current Monthly Burn: 313.6K XAF');
    console.log('🎯 Target: Reduce expenses to achieve profitability\n');

    // 1. Update Rent - Remove office space
    console.log('1️⃣  Updating Rent (Remove Office Space)...');
    const rentExpense = await RecurringExpense.findOne({
      where: { name: { [Sequelize.Op.like]: '%Rent%' } }
    });

    if (rentExpense) {
      const oldRent = parseFloat(rentExpense.amount);
      await rentExpense.update({
        amount: 70000, // Only home rent now
        description: 'Monthly home rent (office space dropped to reduce costs)',
        notes: 'Moved operations from office to home. Savings: 100K XAF/month',
        monthlyEquivalent: 70000
      });
      console.log(`   ✅ Rent: ${(oldRent / 1000).toFixed(0)}K → 70K XAF (Saved: ${((oldRent - 70000) / 1000).toFixed(0)}K)`);
    }

    // 2. Update Starlink - Downgrade plan
    console.log('\n2️⃣  Updating Starlink (Downgrade Plan)...');
    const starlinkExpense = await RecurringExpense.findOne({
      where: { name: { [Sequelize.Op.like]: '%Starlink%' } }
    });

    if (starlinkExpense) {
      const oldStarlink = parseFloat(starlinkExpense.amount);
      await starlinkExpense.update({
        amount: 30000,
        description: 'Starlink internet service (downgraded plan)',
        notes: 'Reduced from 60K to 30K XAF per month to cut costs',
        monthlyEquivalent: 30000
      });
      console.log(`   ✅ Starlink: ${(oldStarlink / 1000).toFixed(0)}K → 30K XAF (Saved: ${((oldStarlink - 30000) / 1000).toFixed(0)}K)`);
    }

    // 3. Add Food expense
    console.log('\n3️⃣  Adding Food Expense...');
    const foodExpense = await RecurringExpense.create({
      name: 'Food & Groceries',
      description: 'Monthly food and grocery expenses for household',
      category: 'general',
      amount: 50000,
      currency: 'XAF',
      frequency: 'monthly',
      status: 'active',
      isEssential: true,
      provider: 'Various',
      notes: 'Essential household food budget',
      color: '#ef4444'
    });
    console.log(`   ✅ Food: +50K XAF/month (Essential expense added)`);

    // 4. Add Wife's Allowance
    console.log('\n4️⃣  Adding Wife\'s Allowance...');
    const allowanceExpense = await RecurringExpense.create({
      name: 'Wife\'s Monthly Allowance',
      description: 'Monthly allowance for wife',
      category: 'general',
      amount: 5000,
      currency: 'XAF',
      frequency: 'monthly',
      status: 'active',
      isEssential: true,
      provider: 'Family',
      notes: 'Monthly personal allowance',
      color: '#ec4899'
    });
    console.log(`   ✅ Wife's Allowance: +5K XAF/month`);

    // Calculate new totals
    console.log('\n📊 RECALCULATING FINANCIAL POSITION...\n');

    const allExpenses = await RecurringExpense.findAll({
      where: { status: 'active' }
    });

    const totalMonthly = allExpenses.reduce((sum, e) => {
      return sum + parseFloat(e.monthlyEquivalent || 0);
    }, 0);

    const monthlyRevenue = 300000; // From Abba contract
    const monthlyProfit = monthlyRevenue - totalMonthly;

    console.log('💵 UPDATED FINANCIAL SUMMARY:');
    console.log('─'.repeat(50));
    console.log(`  💰 Monthly Revenue:  ${(monthlyRevenue / 1000).toFixed(1)}K XAF`);
    console.log(`  💸 Monthly Expenses: ${(totalMonthly / 1000).toFixed(1)}K XAF`);
    console.log('─'.repeat(50));

    if (monthlyProfit >= 0) {
      console.log(`  ✅ Monthly Profit:   +${(monthlyProfit / 1000).toFixed(1)}K XAF`);
      console.log(`  📈 Yearly Profit:    +${(monthlyProfit * 12 / 1000).toFixed(0)}K XAF`);
      console.log(`\n  🎉 PROFITABLE! You're now saving ${(monthlyProfit / 1000).toFixed(1)}K XAF per month!`);
    } else {
      console.log(`  ⚠️  Monthly Loss:     ${(monthlyProfit / 1000).toFixed(1)}K XAF`);
      console.log(`  📉 Yearly Loss:      ${(monthlyProfit * 12 / 1000).toFixed(0)}K XAF`);
    }

    console.log('\n💡 OPTIMIZATION RESULTS:');
    console.log('─'.repeat(50));
    console.log('  Previous Burn: 313.6K XAF/month');
    console.log(`  New Burn:      ${(totalMonthly / 1000).toFixed(1)}K XAF/month`);
    console.log(`  Savings:       ${((313600 - totalMonthly) / 1000).toFixed(1)}K XAF/month`);
    console.log(`  Improvement:   ${(((313600 - totalMonthly) / 313600) * 100).toFixed(1)}% reduction`);

    console.log('\n📋 ACTIVE EXPENSES BREAKDOWN:');
    console.log('─'.repeat(50));
    allExpenses
      .sort((a, b) => parseFloat(b.monthlyEquivalent) - parseFloat(a.monthlyEquivalent))
      .forEach(expense => {
        const amount = parseFloat(expense.monthlyEquivalent);
        const percentage = (amount / totalMonthly * 100).toFixed(1);
        const essential = expense.isEssential ? '⭐' : '  ';
        console.log(`  ${essential} ${expense.name.padEnd(35)} ${(amount / 1000).toFixed(1).padStart(6)}K (${percentage.padStart(5)}%)`);
      });

    await sequelize.close();
    console.log('\n✓ Database connection closed');
    console.log('\n🎯 Next Step: Refresh your Mission Control dashboard to see updated financials!');
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await sequelize.close();
    process.exit(1);
  }
}

optimizeExpenses();
