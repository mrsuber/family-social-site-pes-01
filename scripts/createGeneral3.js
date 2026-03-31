const General = require('../models/General');
const Department = require('../models/Department');
const { sequelize } = require('../config/db');

async function createGeneral3() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Create General 3: SuberFood - Farm & Agriculture
    const general3 = await General.create({
      name: 'SuberFood - Farm & Agriculture',
      description: 'Complete farm-to-table food production, processing, and distribution. Vertical integration ensuring food security and generating massive revenue through transparent, traceable operations.',
      orderNumber: 3,
      status: 'planning',
      objectives: [
        'Establish complete farm-to-table vertical integration',
        'Achieve 50,000+ orders per day across multi-country operations',
        'Implement full transparency with QR code traceability from farm to table',
        'Launch 2 restaurant locations by Phase 2 (1,000+ orders)',
        'Scale to 5+ locations with B2B and D2C channels by Phase 4',
        'Reach profitability with 99.9% uptime and 10,000+ concurrent users'
      ]
    });

    console.log('\n✅ General 3 created successfully!');
    console.log(`   Name: ${general3.name}`);
    console.log(`   Status: ${general3.status}`);
    console.log(`   ID: ${general3.id}`);

    // Create Parent Departments (3 main divisions)
    console.log('\n📋 Creating parent departments (3 divisions)...');

    const productionDivision = await Department.create({
      name: 'Production Division',
      description: 'Complete agricultural production including cash crops, food crops, fish farming, poultry, livestock, and R&D for farming innovation.',
      generalId: general3.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 1,
      objectives: [
        'Manage all agricultural production operations',
        'Optimize crop yields and livestock health',
        'Conduct R&D for sustainable farming techniques',
        'Ensure food security for organizational needs'
      ]
    });
    console.log(`   ✅ ${productionDivision.name}`);

    const processingDivision = await Department.create({
      name: 'Processing Division',
      description: 'Transform raw agricultural products into finished goods with full traceability. Production planning, quality control, batch production, and recipe management.',
      generalId: general3.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 2,
      objectives: [
        'Convert raw products to finished goods (milk→powder, tomatoes→sachets)',
        'Maintain HACCP compliance and quality standards',
        'Implement full batch traceability and BOM management',
        'Optimize production scheduling and efficiency'
      ]
    });
    console.log(`   ✅ ${processingDivision.name}`);

    const distributionDivision = await Department.create({
      name: 'Distribution Division',
      description: 'Multi-channel distribution including B2B bulk sales, D2C retail, fine dining restaurants, and mass cafeteria operations.',
      generalId: general3.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 3,
      objectives: [
        'Scale to 50,000+ orders per day',
        'Launch B2B portal for wholesale customers',
        'Build D2C e-commerce and mobile app',
        'Operate 5+ restaurant locations across channels'
      ]
    });
    console.log(`   ✅ ${distributionDivision.name}`);

    // Create Child Departments under Production Division
    console.log('\n📦 Creating child departments under Production Division...');

    const childDepartments = [
      // Production Division Children
      {
        name: 'Cash Crops',
        description: 'Commercial agriculture for revenue generation. High-value crops optimized for market demand and profitability.',
        generalId: general3.id,
        parentDepartmentId: productionDivision.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Food Crops',
        description: 'Vegetables, grains, and staples for internal consumption and market sales. Focus on nutritional value and yield.',
        generalId: general3.id,
        parentDepartmentId: productionDivision.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Fish Farming (Aquaculture)',
        description: 'Water quality monitoring, fish health management, and sustainable aquaculture operations.',
        generalId: general3.id,
        parentDepartmentId: productionDivision.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Poultry',
        description: 'Chicken and egg production with flock health management and biosecurity protocols.',
        generalId: general3.id,
        parentDepartmentId: productionDivision.id,
        status: 'planning',
        orderNumber: 4
      },
      {
        name: 'Livestock',
        description: 'Cattle, goats, sheep management. Milk production, breeding programs, and veterinary care.',
        generalId: general3.id,
        parentDepartmentId: productionDivision.id,
        status: 'planning',
        orderNumber: 5
      },
      {
        name: 'Agricultural R&D',
        description: 'Pesticide trials, new farming techniques, crop optimization, and sustainable agriculture research.',
        generalId: general3.id,
        parentDepartmentId: productionDivision.id,
        status: 'planning',
        orderNumber: 6
      },

      // Processing Division Children
      {
        name: 'Production Planning',
        description: 'Production scheduling, resource allocation, capacity planning, and workflow optimization across all processing operations.',
        generalId: general3.id,
        parentDepartmentId: processingDivision.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Quality Control & HACCP',
        description: 'Quality assurance, food safety standards, HACCP compliance, and regulatory adherence for all processed products.',
        generalId: general3.id,
        parentDepartmentId: processingDivision.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Batch Production',
        description: 'Batch manufacturing with full traceability from raw materials to finished goods. Track every step of the production journey.',
        generalId: general3.id,
        parentDepartmentId: processingDivision.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Recipe & BOM Management',
        description: 'Recipe development, Bill of Materials management, ingredient sourcing, and product formulation.',
        generalId: general3.id,
        parentDepartmentId: processingDivision.id,
        status: 'planning',
        orderNumber: 4
      },

      // Distribution Division Children
      {
        name: 'Bulk Distribution (B2B)',
        description: 'Wholesale to supermarkets, restaurant supply chains, industrial customers. Partner portal for bulk ordering.',
        generalId: general3.id,
        parentDepartmentId: distributionDivision.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Retail (D2C)',
        description: 'E-commerce platform, consumer mobile app, subscription services (weekly produce boxes), and last-mile delivery.',
        generalId: general3.id,
        parentDepartmentId: distributionDivision.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Classical Restaurants',
        description: 'Fine dining establishments with reservations system, cook-to-order service, premium pricing, and high-end experience.',
        generalId: general3.id,
        parentDepartmentId: distributionDivision.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Cafeterias',
        description: 'Mass service operations with pre-prepared food, quick POS systems, fast service, and volume-focused execution.',
        generalId: general3.id,
        parentDepartmentId: distributionDivision.id,
        status: 'planning',
        orderNumber: 4
      }
    ];

    for (const deptData of childDepartments) {
      const dept = await Department.create(deptData);
      console.log(`   ✅ ${dept.name}`);
    }

    console.log('\n🎉 General 3 (SuberFood) setup complete!');
    console.log(`   General: ${general3.name}`);
    console.log(`   Parent Departments: 3 (Production, Processing, Distribution)`);
    console.log(`   Child Departments: ${childDepartments.length}`);
    console.log(`   Total Departments: ${3 + childDepartments.length}`);
    console.log(`   Status: PLANNING`);
    console.log('\n💡 Ready for Phase 0 (35% complete - foundation/documentation)!');
    console.log('📍 Next Steps: Assign commander, add personnel, acquire farmland & equipment');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating General 3:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createGeneral3();
