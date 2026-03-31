const Department = require('../models/Department');
const General = require('../models/General');

async function addDesignDepartment() {
  try {
    console.log('🎨 Adding DESIGN & UX Department to General 0...\n');

    // Find General 0
    const general0 = await General.findOne({ where: { orderNumber: 0 } });
    if (!general0) {
      throw new Error('General 0 not found');
    }
    console.log(`✅ Found General 0: ${general0.name}\n`);

    // Create DESIGN & UX department
    const designDept = await Department.create({
      name: 'DESIGN & UX',
      description: 'User experience design, product design, branding, and design systems for all technology products',
      generalId: general0.id,
      status: 'active',
      orderNumber: 4,
      objectives: JSON.stringify([
        'Lead UI/UX design for all digital products',
        'Establish and maintain design systems',
        'Conduct user research and usability testing',
        'Create cohesive brand identities',
        'Ensure accessibility and inclusive design',
        'Collaborate with software teams on implementation',
        'Drive design-led innovation'
      ])
    });

    console.log(`✅ Created: ${designDept.name} [${designDept.status}]\n`);

    // Create subdepartments
    const subdepartments = [
      {
        name: 'UI/UX Design',
        description: 'User interface and user experience design for web, mobile, and desktop applications',
        parentDepartmentId: designDept.id,
        generalId: general0.id,
        status: 'active',
        orderNumber: 1,
        objectives: JSON.stringify([
          'Design intuitive user interfaces',
          'Create wireframes and prototypes',
          'Conduct user testing and iterate designs',
          'Ensure consistency across all touchpoints',
          'Optimize user flows and interactions'
        ])
      },
      {
        name: 'Digital Branding',
        description: 'Brand identity, visual design, and brand guidelines for digital products and platforms',
        parentDepartmentId: designDept.id,
        generalId: general0.id,
        status: 'active',
        orderNumber: 2,
        objectives: JSON.stringify([
          'Develop brand identity systems',
          'Create visual design languages',
          'Maintain brand consistency',
          'Design marketing and promotional materials',
          'Evolve brand as products grow'
        ])
      },
      {
        name: 'Product Design',
        description: 'End-to-end product design from concept to launch, focusing on user needs and business goals',
        parentDepartmentId: designDept.id,
        generalId: general0.id,
        status: 'active',
        orderNumber: 3,
        objectives: JSON.stringify([
          'Lead product design from concept to launch',
          'Balance user needs with business objectives',
          'Create product roadmaps and feature designs',
          'Collaborate with product managers and engineers',
          'Deliver high-fidelity mockups and specifications'
        ])
      },
      {
        name: 'Design Systems',
        description: 'Component libraries, design tokens, and design system documentation for scalable design',
        parentDepartmentId: designDept.id,
        generalId: general0.id,
        status: 'active',
        orderNumber: 4,
        objectives: JSON.stringify([
          'Build and maintain component libraries',
          'Create design tokens and variables',
          'Document design patterns and guidelines',
          'Ensure design-dev handoff efficiency',
          'Scale design systems across products'
        ])
      },
      {
        name: 'User Research',
        description: 'User research, usability testing, analytics, and data-driven design insights',
        parentDepartmentId: designDept.id,
        generalId: general0.id,
        status: 'active',
        orderNumber: 5,
        objectives: JSON.stringify([
          'Conduct user interviews and surveys',
          'Perform usability testing sessions',
          'Analyze user behavior and analytics',
          'Create user personas and journey maps',
          'Provide actionable insights to design teams'
        ])
      },
      {
        name: 'Motion & Interaction Design',
        description: 'Micro-interactions, animations, and motion design for enhanced user experiences',
        parentDepartmentId: designDept.id,
        generalId: general0.id,
        status: 'active',
        orderNumber: 6,
        objectives: JSON.stringify([
          'Design micro-interactions and animations',
          'Create motion design guidelines',
          'Enhance UX through purposeful motion',
          'Prototype interactive experiences',
          'Collaborate on implementation with frontend teams'
        ])
      }
    ];

    console.log(`📦 Creating ${subdepartments.length} subdepartments...\n`);

    for (const subDept of subdepartments) {
      const dept = await Department.create(subDept);
      console.log(`  ✅ ${dept.name}`);
    }

    console.log(`\n🎉 DESIGN & UX Department successfully added!`);
    console.log(`\n📊 Summary:`);
    console.log(`   🎨 Main Department: DESIGN & UX`);
    console.log(`   📦 Subdepartments: ${subdepartments.length}`);
    console.log(`   ✅ All Active`);
    console.log(`\n💡 Design is now a core pillar of General 0 Technology & Innovation!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

addDesignDepartment();
