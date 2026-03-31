const { Sequelize } = require('sequelize');
const Department = require('../models/Department');
const General = require('../models/General');

const sequelize = new Sequelize(process.env.DATABASE_URL || {
  database: 'subercraftex_db',
  username: 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

async function fixServiceOperations() {
  try {
    console.log('🔧 Fixing Service Operations Department...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');
    console.log(`✅ Found General 1: ${general1.name}`);

    // Find Service Operations Department
    const serviceOps = await Department.findOne({
      where: {
        generalId: general1.id,
        name: 'Service Operations'
      }
    });
    if (!serviceOps) throw new Error('Service Operations department not found');
    console.log(`✅ Found Service Operations Department\n`);

    // Delete incorrect subdepartments
    const incorrectDepts = await Department.findAll({
      where: { parentDepartmentId: serviceOps.id }
    });

    if (incorrectDepts.length > 0) {
      console.log(`🗑️  Deleting ${incorrectDepts.length} incorrect subdepartments...`);
      for (const dept of incorrectDepts) {
        await dept.destroy();
        console.log(`   ❌ Deleted: ${dept.name}`);
      }
      console.log();
    }

    // Create correct subdepartments based on actual SuberCraftex services
    const correctSubdepartments = [
      {
        name: 'Men\'s Tailoring & Bespoke',
        description: 'Executive bespoke suits, gentleman\'s custom wear, alterations, and men\'s fashion tailoring services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 1,
        objectives: JSON.stringify([
          'Craft executive bespoke suits from premium fabrics',
          'Provide gentleman\'s custom wear tailoring',
          'Offer alterations and fitting services',
          'Maintain 7-14 day turnaround for custom pieces',
          'Ensure precision fit with multiple fittings'
        ])
      },
      {
        name: 'Women\'s Tailoring & Couture',
        description: 'Ladies\' couture collection, custom dresses, alterations, and women\'s fashion tailoring services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 2,
        objectives: JSON.stringify([
          'Create ladies\' couture collection pieces',
          'Provide custom dress and gown tailoring',
          'Offer alterations and fitting services',
          'Deliver fashion-forward women\'s wear',
          'Maintain high-quality craftsmanship standards'
        ])
      },
      {
        name: 'Woodworking & Furniture',
        description: 'Custom furniture, shelves, cupboards, kitchen utensils, and artisan woodcraft services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 3,
        objectives: JSON.stringify([
          'Craft custom furniture and shelving',
          'Build cupboards and storage solutions',
          'Create kitchen utensils and wood pieces',
          'Provide furniture repair services',
          'Use quality wood and lasting finishes'
        ])
      },
      {
        name: 'Embroidery Services',
        description: 'Custom embroidery for apparel - logos, names, monograms, and decorative designs',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 4,
        objectives: JSON.stringify([
          'Provide custom embroidery for men and women\'s wear',
          'Embroider logos, names, and monograms',
          'Offer decorative design embroidery',
          'Service uniforms, gifts, and fashion pieces',
          'Maintain high-quality embroidery standards'
        ])
      },
      {
        name: 'Home Textiles & Window Treatments',
        description: 'Custom blinds, curtains, bedding, and home textile solutions',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 5,
        objectives: JSON.stringify([
          'Design and install custom window treatments',
          'Create luxury custom bedding',
          'Provide blinds and curtain solutions',
          'Offer home textile customization',
          'Ensure proper measurements and fittings'
        ])
      },
      {
        name: 'Leather Works',
        description: 'Custom leather goods, repairs, and leather crafting services (Coming Soon)',
        status: 'planning',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 6,
        objectives: JSON.stringify([
          'Develop leather crafting capabilities',
          'Offer custom leather goods',
          'Provide leather repair services',
          'Create bags, belts, and accessories',
          'Establish leather supplier relationships'
        ])
      },
      {
        name: 'Interior Design Services',
        description: 'Interior design consultations, space planning, and home styling services (Coming Soon)',
        status: 'planning',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 7,
        objectives: JSON.stringify([
          'Provide interior design consultations',
          'Offer space planning services',
          'Create mood boards and design concepts',
          'Coordinate with other service departments',
          'Build design portfolio and client base'
        ])
      },
      {
        name: 'Service Coordination & Bookings',
        description: 'Central service booking platform, scheduling, and customer service management',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 8,
        objectives: JSON.stringify([
          'Manage online service booking platform',
          'Coordinate appointments and schedules',
          'Handle customer inquiries and quotes',
          'Track service orders and deliveries',
          'Ensure smooth handoff between departments'
        ])
      }
    ];

    console.log(`📦 Creating ${correctSubdepartments.length} correct subdepartments...\n`);

    for (const deptData of correctSubdepartments) {
      const dept = await Department.create(deptData);
      const statusIcon = dept.status === 'active' ? '✅' : '📅';
      console.log(`${statusIcon} Created: ${dept.name} [${dept.status}]`);
    }

    console.log(`\n🎉 Service Operations correctly restructured!`);
    console.log(`\n📋 Summary:`);
    console.log(`   ✅ Active Services: 6`);
    console.log(`   📅 Coming Soon: 2`);
    console.log(`   📦 Total: ${correctSubdepartments.length}`);

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixServiceOperations();
