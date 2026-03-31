const { Sequelize } = require('sequelize');
const Department = require('../models/Department');
const General = require('../models/General');

// Initialize Sequelize from environment or server config
const sequelize = new Sequelize(process.env.DATABASE_URL || {
  database: 'subercraftex_db',
  username: 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

async function expandServiceOperations() {
  try {
    console.log('🔧 Expanding Service Operations Department...\n');

    // Find General 1 (SuberCraftex Operations)
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) {
      throw new Error('General 1 not found');
    }
    console.log(`✅ Found General 1: ${general1.name}`);

    // Find Service Operations Department
    const serviceOps = await Department.findOne({
      where: {
        generalId: general1.id,
        name: 'Service Operations'
      }
    });

    if (!serviceOps) {
      throw new Error('Service Operations department not found');
    }
    console.log(`✅ Found Service Operations Department (ID: ${serviceOps.id})\n`);

    // Define subdepartments for all SuberCraftex services
    const subdepartments = [
      {
        name: 'Fashion & Tailoring Services',
        description: 'Custom tailoring, alterations, fashion design, and clothing customization services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 1,
        objectives: JSON.stringify([
          'Manage custom tailoring orders and alterations',
          'Provide professional fashion design consultations',
          'Deliver high-quality clothing customization',
          'Maintain quick turnaround times (7-14 days)',
          'Achieve 95%+ customer satisfaction'
        ])
      },
      {
        name: 'Graphic Design Services',
        description: 'Logo design, branding, marketing materials, and visual content creation',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 2,
        objectives: JSON.stringify([
          'Deliver professional logo and branding designs',
          'Create marketing materials (flyers, posters, banners)',
          'Provide brand identity packages',
          'Complete design projects within 5-7 business days',
          'Offer unlimited revisions until client satisfaction'
        ])
      },
      {
        name: 'Web Development Services',
        description: 'Website design, development, maintenance, and digital solutions',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 3,
        objectives: JSON.stringify([
          'Build responsive, modern websites',
          'Provide e-commerce solutions',
          'Offer website maintenance and support',
          'Ensure mobile-first design approach',
          'Deliver SEO-optimized websites'
        ])
      },
      {
        name: 'Photography & Videography',
        description: 'Professional photography, videography, and media production services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 4,
        objectives: JSON.stringify([
          'Provide event photography and videography',
          'Offer product photography for e-commerce',
          'Create promotional video content',
          'Deliver edited photos within 3-5 days',
          'Provide high-resolution final deliverables'
        ])
      },
      {
        name: 'Event Planning & Management',
        description: 'Event coordination, planning, decoration, and execution services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 5,
        objectives: JSON.stringify([
          'Plan and coordinate corporate and social events',
          'Provide event decoration and setup',
          'Manage vendor relationships',
          'Ensure seamless event execution',
          'Handle events from 10 to 500+ attendees'
        ])
      },
      {
        name: 'Catering Services',
        description: 'Professional catering for events, meetings, and special occasions',
        status: 'planning',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 6,
        objectives: JSON.stringify([
          'Provide menu planning and food preparation',
          'Offer diverse cuisine options',
          'Handle dietary restrictions and preferences',
          'Ensure food safety and quality standards',
          'Service events of various sizes'
        ])
      },
      {
        name: 'Printing Services',
        description: 'Digital and offset printing, merchandise printing, and promotional materials',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 7,
        objectives: JSON.stringify([
          'Print business cards, flyers, and brochures',
          'Offer merchandise printing (t-shirts, mugs, etc.)',
          'Provide large format printing (banners, posters)',
          'Deliver high-quality print materials',
          'Complete orders within 3-5 business days'
        ])
      },
      {
        name: 'Digital Marketing Services',
        description: 'Social media management, content creation, and digital advertising',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 8,
        objectives: JSON.stringify([
          'Manage social media accounts and campaigns',
          'Create engaging content calendars',
          'Run digital advertising campaigns',
          'Provide analytics and reporting',
          'Grow client social media presence'
        ])
      },
      {
        name: 'Content Writing Services',
        description: 'Professional writing, copywriting, and content creation services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 9,
        objectives: JSON.stringify([
          'Write blog posts and articles',
          'Create website copy and product descriptions',
          'Provide SEO-optimized content',
          'Offer proofreading and editing services',
          'Deliver content within agreed timelines'
        ])
      },
      {
        name: 'Consulting Services',
        description: 'Business consulting, strategy, and professional advisory services',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 10,
        objectives: JSON.stringify([
          'Provide business strategy consultations',
          'Offer market research and analysis',
          'Support startup development',
          'Deliver actionable recommendations',
          'Maintain client confidentiality'
        ])
      },
      {
        name: 'Training & Workshops',
        description: 'Professional training programs, workshops, and skill development services',
        status: 'planning',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 11,
        objectives: JSON.stringify([
          'Conduct professional skills training',
          'Offer workshops on various topics',
          'Provide certification programs',
          'Deliver both online and in-person training',
          'Achieve high participant satisfaction'
        ])
      },
      {
        name: 'Service Booking & Coordination',
        description: 'Central service booking, scheduling, and customer service coordination',
        status: 'active',
        parentDepartmentId: serviceOps.id,
        generalId: general1.id,
        orderNumber: 12,
        objectives: JSON.stringify([
          'Manage service booking platform',
          'Coordinate service delivery schedules',
          'Handle customer inquiries and requests',
          'Ensure timely service fulfillment',
          'Track service performance metrics'
        ])
      }
    ];

    console.log(`📦 Creating ${subdepartments.length} subdepartments...\n`);

    let created = 0;
    let skipped = 0;

    for (const deptData of subdepartments) {
      // Check if already exists
      const existing = await Department.findOne({
        where: {
          name: deptData.name,
          parentDepartmentId: serviceOps.id
        }
      });

      if (existing) {
        console.log(`⏭️  Skipped: ${deptData.name} (already exists)`);
        skipped++;
      } else {
        const dept = await Department.create(deptData);
        console.log(`✅ Created: ${dept.name} [${dept.status}]`);
        created++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${subdepartments.length}`);
    console.log(`\n🎉 Service Operations expansion complete!`);

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

expandServiceOperations();
