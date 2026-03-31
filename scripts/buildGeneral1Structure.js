const { Sequelize } = require('sequelize');
require('dotenv').config();

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

const General = require('../models/General');
const Department = require('../models/Department');
const Person = require('../models/Person');
const Project = require('../models/Project');

async function buildGeneral1() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected\n');

    // Get General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) {
      console.error('✗ General 1 not found!');
      process.exit(1);
    }

    // Update General 1 details
    await general1.update({
      name: 'SuberCraftex Operations',
      description: 'Manufacturing empire - e-commerce, investor management, services, and crafting operations for SuberCraftex platform',
      status: 'operational',
      objectives: JSON.stringify([
        'Manage all SuberCraftex e-commerce operations',
        'Oversee investor relations and profit distribution',
        'Coordinate service bookings and custom production',
        'Scale from fashion to smart furniture to automotive',
        'Achieve 1,000 orders/month by end of Year 1',
        'Grow investor base to 50+ by Year 2',
        'Launch smart furniture product line by Year 3'
      ])
    });

    console.log('✅ Updated General 1: SuberCraftex Operations\n');

    // Assign Commander (FAUZIA MONYUY - candidate)
    const commander = await Person.findOne({
      where: { fullName: { [Sequelize.Op.like]: '%FAUZIA MONYUY%' } }
    });

    if (commander) {
      await general1.update({ commanderId: commander.id });
      await commander.update({
        generalId: general1.id,
        title: 'General 1 - SuberCraftex Commander (Candidate)',
        relationshipType: 'general_candidate'
      });
      console.log('✅ Assigned Commander: FAUZIA MONYUY\n');
    }

    console.log('🏢 Creating Department Structure...\n');

    // DEPARTMENT 1: E-Commerce & Product Management
    const ecommerceDept = await Department.create({
      name: 'E-Commerce & Product Management',
      description: 'Manages product catalog, inventory, pricing, and online store operations for SuberCraftex.com',
      generalId: general1.id,
      status: 'active',
      orderNumber: 1,
      objectives: JSON.stringify([
        'Maintain 500+ active products by Year 1',
        'Achieve 1,000 orders/month',
        'Optimize product catalog and SEO',
        'Manage inventory across all product lines'
      ])
    });
    console.log('  ✓ Created: E-Commerce & Product Management');

    // DEPARTMENT 2: Investor Relations & Finance
    const investorDept = await Department.create({
      name: 'Investor Relations & Finance',
      description: 'Manages investor onboarding, KYC verification, fund allocation, and profit distribution',
      generalId: general1.id,
      status: 'active',
      orderNumber: 2,
      objectives: JSON.stringify([
        'Grow investor base from 6 to 50+ by Year 2',
        'Maintain 100% accurate profit distribution',
        'Process deposits and withdrawals efficiently',
        'Provide transparent reporting to all investors'
      ])
    });
    console.log('  ✓ Created: Investor Relations & Finance');

    // DEPARTMENT 3: Service Operations
    const serviceDept = await Department.create({
      name: 'Service Operations',
      description: 'Coordinates service bookings, custom production, tailoring, woodworking, and all service provider management',
      generalId: general1.id,
      status: 'active',
      orderNumber: 3,
      objectives: JSON.stringify([
        'Onboard 50+ service providers',
        'Manage 100+ service bookings/month',
        'Ensure quality standards across all services',
        'Expand service categories'
      ])
    });
    console.log('  ✓ Created: Service Operations');

    // DEPARTMENT 4: Manufacturing & Production (Future)
    const manufacturingDept = await Department.create({
      name: 'Manufacturing & Production',
      description: 'Future smart furniture manufacturing, chip programming, and production operations',
      generalId: general1.id,
      status: 'planning',
      orderNumber: 4,
      objectives: JSON.stringify([
        'Launch smart furniture product line by Year 3',
        'Establish chip programming capabilities',
        'Set up manufacturing facility',
        'Achieve 50 units/month production capacity'
      ])
    });
    console.log('  ✓ Created: Manufacturing & Production');

    // DEPARTMENT 5: Logistics & Delivery
    const logisticsDept = await Department.create({
      name: 'Logistics & Delivery',
      description: 'Manages order fulfillment, delivery drivers, shipping tracking, and customer delivery experience',
      generalId: general1.id,
      status: 'active',
      orderNumber: 5,
      objectives: JSON.stringify([
        'Achieve 95%+ on-time delivery rate',
        'Recruit and manage delivery drivers',
        'Optimize delivery routes',
        'Provide real-time tracking to customers'
      ])
    });
    console.log('  ✓ Created: Logistics & Delivery');

    // DEPARTMENT 6: Customer Experience
    const customerDept = await Department.create({
      name: 'Customer Experience',
      description: 'Handles customer support, reviews, feedback, and ensures exceptional shopping experience',
      generalId: general1.id,
      status: 'active',
      orderNumber: 6,
      objectives: JSON.stringify([
        'Maintain 99% customer satisfaction',
        'Respond to inquiries within 24 hours',
        'Manage product reviews and ratings',
        'Build customer loyalty programs'
      ])
    });
    console.log('  ✓ Created: Customer Experience');

    // DEPARTMENT 7: Marketing & Growth
    const marketingDept = await Department.create({
      name: 'Marketing & Growth',
      description: 'Drives customer acquisition, brand awareness, social media, and revenue growth for SuberCraftex',
      generalId: general1.id,
      status: 'active',
      orderNumber: 7,
      objectives: JSON.stringify([
        'Achieve 1,000+ monthly website visitors',
        'Grow social media following',
        'Run targeted ad campaigns',
        'Achieve 10% monthly growth rate'
      ])
    });
    console.log('  ✓ Created: Marketing & Growth');

    console.log('\n👥 Adding Key Personnel...\n');

    // Add some key personnel (you can customize these)

    // Product Manager
    const productManager = await Person.create({
      fullName: 'Product Manager - TBH',
      title: 'Head of Product Management',
      email: 'product@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: ecommerceDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Manages product catalog, pricing, inventory'
    });
    console.log('  ✓ Added: Product Manager (TBH)');

    // Investor Relations Manager
    const investorManager = await Person.create({
      fullName: 'Investor Relations Manager - TBH',
      title: 'Head of Investor Relations',
      email: 'investors@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: investorDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Manages investor onboarding, KYC, allocations, profit distribution'
    });
    console.log('  ✓ Added: Investor Relations Manager (TBH)');

    // Service Coordinator
    const serviceCoordinator = await Person.create({
      fullName: 'Service Coordinator - TBH',
      title: 'Head of Service Operations',
      email: 'services@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: serviceDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Coordinates service providers, manages bookings, ensures quality'
    });
    console.log('  ✓ Added: Service Coordinator (TBH)');

    // Manufacturing Lead
    const manufacturingLead = await Person.create({
      fullName: 'Manufacturing Lead - TBH',
      title: 'Head of Manufacturing & Production',
      email: 'manufacturing@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: manufacturingDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Will lead smart furniture manufacturing and chip programming'
    });
    console.log('  ✓ Added: Manufacturing Lead (TBH)');

    // Logistics Manager
    const logisticsManager = await Person.create({
      fullName: 'Logistics Manager - TBH',
      title: 'Head of Logistics & Delivery',
      email: 'logistics@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: logisticsDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Manages delivery drivers, shipping, tracking'
    });
    console.log('  ✓ Added: Logistics Manager (TBH)');

    // Customer Success Lead
    const customerLead = await Person.create({
      fullName: 'Customer Success Lead - TBH',
      title: 'Head of Customer Experience',
      email: 'support@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: customerDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Handles customer support, reviews, satisfaction'
    });
    console.log('  ✓ Added: Customer Success Lead (TBH)');

    // Marketing Manager
    const marketingManager = await Person.create({
      fullName: 'Marketing Manager - TBH',
      title: 'Head of Marketing & Growth',
      email: 'marketing@subercraftex.com',
      relationshipType: 'employee',
      generalId: general1.id,
      departmentId: marketingDept.id,
      status: 'planned',
      performanceRating: null,
      notes: 'To Be Hired - Drives customer acquisition, brand awareness, growth'
    });
    console.log('  ✓ Added: Marketing Manager (TBH)');

    console.log('\n🚀 Creating Active Projects...\n');

    // Project 1: Fashion E-Commerce Growth
    const fashionProject = await Project.create({
      name: 'Fashion E-Commerce Scale-Up',
      description: 'Scale SuberCraftex fashion e-commerce from 9 orders to 1,000/month by end of Year 1',
      status: 'active',
      generalId: general1.id,
      departmentId: ecommerceDept.id,
      startDate: new Date('2026-03-01'),
      targetEndDate: new Date('2026-12-31'),
      notes: 'Current: 106 products, 9 orders. Target: 500+ products, 1,000 orders/month'
    });
    console.log('  ✓ Created: Fashion E-Commerce Scale-Up');

    // Project 2: Investor Growth Campaign
    const investorProject = await Project.create({
      name: 'Investor Recruitment Campaign',
      description: 'Grow investor base from 6 to 50+ approved investors by end of Year 1',
      status: 'active',
      generalId: general1.id,
      departmentId: investorDept.id,
      startDate: new Date('2026-03-15'),
      targetEndDate: new Date('2026-12-31'),
      notes: 'Current: 6 KYC approved. Target: 50+ active investors with allocations'
    });
    console.log('  ✓ Created: Investor Recruitment Campaign');

    // Project 3: Service Provider Onboarding
    const serviceProject = await Project.create({
      name: 'Service Provider Network Expansion',
      description: 'Onboard 50 service providers (tailors, woodworkers, craftspeople) and achieve 100 bookings/month',
      status: 'active',
      generalId: general1.id,
      departmentId: serviceDept.id,
      startDate: new Date('2026-03-01'),
      targetEndDate: new Date('2026-09-30'),
      notes: 'Current: 22 services listed, 7 active. Target: 50+ providers, 100 bookings/month'
    });
    console.log('  ✓ Created: Service Provider Network Expansion');

    // Project 4: Smart Furniture R&D
    const smartFurnitureProject = await Project.create({
      name: 'Smart Furniture Product Development',
      description: 'Design and prototype first IoT-enabled smart furniture product with embedded chips',
      status: 'planning',
      generalId: general1.id,
      departmentId: manufacturingDept.id,
      startDate: new Date('2026-07-01'),
      targetEndDate: new Date('2027-03-31'),
      notes: 'Phase 1: Research & Design. Phase 2: Prototype. Phase 3: Manufacturing setup'
    });
    console.log('  ✓ Created: Smart Furniture Product Development');

    console.log('\n📊 GENERAL 1 - SUBERCRAFTEX OPERATIONS SUMMARY');
    console.log('═'.repeat(70));
    console.log(`  General: ${general1.name}`);
    console.log(`  Status: ${general1.status.toUpperCase()}`);
    console.log(`  Commander: ${commander ? commander.fullName : 'Unassigned'}`);
    console.log(`  Departments: 7`);
    console.log(`  Personnel: 7 (all TBH - To Be Hired)`);
    console.log(`  Active Projects: 3`);
    console.log(`  Planning Projects: 1`);
    console.log('');
    console.log('  🌐 Platform: https://subercraftex.com');
    console.log('  📊 Mission Control: https://agent.subercraftex.com/admin/missionControl');
    console.log('');

    console.log('✅ General 1 structure complete!\n');

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await sequelize.close();
    process.exit(1);
  }
}

buildGeneral1();
