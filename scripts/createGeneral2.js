const General = require('../models/General');
const Department = require('../models/Department');
const { sequelize } = require('../config/db');

async function createGeneral2() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Create General 2
    const general2 = await General.create({
      name: 'Legal & Financial Services',
      description: 'Professional legal and accounting services for internal operations and external clients. Handles compliance, tax, government relations, and document management.',
      orderNumber: 2,
      status: 'planning',
      objectives: [
        'Provide legal services for all internal businesses',
        'Offer accounting and tax services to external clients',
        'Build strong government connections and relationships',
        'Ensure regulatory compliance across all operations',
        'Monetize expertise through B2B service offerings'
      ]
    });

    console.log('\n✅ General 2 created successfully!');
    console.log(`   Name: ${general2.name}`);
    console.log(`   Status: ${general2.status}`);
    console.log(`   ID: ${general2.id}`);

    // Create departments under General 2
    const departments = [
      {
        name: 'Legal & Compliance Services',
        description: 'Contract drafting, business registration, regulatory compliance, and litigation support for internal and external clients.',
        generalId: general2.id,
        status: 'planning'
      },
      {
        name: 'Accounting & Tax Services',
        description: 'Bookkeeping, tax filing, financial statements, balance sheets, and audit support for all businesses.',
        generalId: general2.id,
        status: 'planning'
      },
      {
        name: 'Government Relations',
        description: 'Permits, licenses, government liaison, regulatory navigation, and building strategic connections.',
        generalId: general2.id,
        status: 'planning'
      },
      {
        name: 'Document Management',
        description: 'Legal archives, financial records, compliance documentation, and centralized document storage.',
        generalId: general2.id,
        status: 'planning'
      },
      {
        name: 'Client Relations',
        description: 'External client acquisition, service delivery, account management, and business development.',
        generalId: general2.id,
        status: 'planning'
      }
    ];

    console.log('\n📋 Creating departments...');

    for (const deptData of departments) {
      const dept = await Department.create(deptData);
      console.log(`   ✅ ${dept.name}`);
    }

    console.log('\n🎉 General 2 setup complete!');
    console.log(`   General: ${general2.name}`);
    console.log(`   Departments: ${departments.length}`);
    console.log(`   Status: PLANNING`);
    console.log('\n💡 Ready to assign personnel and activate when ready!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating General 2:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createGeneral2();
