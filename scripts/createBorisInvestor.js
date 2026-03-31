const Person = require('../models/Person');
const Department = require('../models/Department');
const { sequelize } = require('../config/db');

async function createBorisInvestor() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Find the Investor Relations & Finance department under SuberCraftex (General 1)
    const investorDept = await Department.findOne({
      where: {
        name: 'Investor Relations & Finance'
      }
    });

    if (!investorDept) {
      console.error('❌ Investor Relations & Finance department not found');
      process.exit(1);
    }

    console.log(`✅ Found department: ${investorDept.name} (ID: ${investorDept.id})`);
    console.log(`   General ID: ${investorDept.generalId}`);

    // Create Boris Lami Fonyuy as an investor
    const boris = await Person.create({
      fullName: 'Boris Lami Fonyuy',
      title: 'Investor',
      email: 'fborislami@gmail.com',
      relationshipType: 'investor',
      generalId: investorDept.generalId,
      departmentId: investorDept.id,
      status: 'active',
      investmentAmount: 401000.00,
      investmentCurrency: 'XAF',
      investmentDate: '2026-02-06',
      equityPercentage: null,
      notes: 'Initial investment of 401,000 XAF (405,000 gross - 4,000 charges). Deposit confirmed via Mobile Money on 2/6/2026. Investor ID: INV-2026-0007'
    });

    console.log('\n✅ Investor created successfully!');
    console.log(`   Name: ${boris.fullName}`);
    console.log(`   Email: ${boris.email}`);
    console.log(`   Investment: ${boris.investmentAmount} ${boris.investmentCurrency}`);
    console.log(`   Date: ${boris.investmentDate}`);
    console.log(`   Department: ${investorDept.name}`);
    console.log(`   Person ID: ${boris.id}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating investor:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createBorisInvestor();
