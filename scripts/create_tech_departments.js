const { sequelize } = require('../config/db');
const Department = require('../models/Department');
const General = require('../models/General');

const departmentStructure = {
  SOFTWARE: {
    description: 'Software Engineering Division',
    children: [
      'Backend Engineering',
      'Frontend Engineering',
      'Mobile Development',
      'API & Integration',
      'Database Engineering',
      'Machine Learning Engineering',
      'AI Research',
      'Data Science & Analytics',
      'Computer Vision',
      'Natural Language Processing',
      'Cloud Infrastructure',
      'DevOps & Automation',
      'Platform Engineering',
      'Cybersecurity',
      'Quality Assurance & Testing'
    ]
  },
  HARDWARE: {
    description: 'Hardware Engineering Division',
    children: [
      'Electronics Design',
      'PCB Design & Layout',
      'Embedded Systems',
      'IoT Engineering',
      'Semiconductor Design',
      'VLSI & Chip Architecture',
      'FPGA Development',
      'ASIC Design',
      'Manufacturing Engineering',
      'Chip Fabrication',
      'Hardware Testing & QA',
      'Supply Chain & Logistics'
    ]
  },
  'RESEARCH & INNOVATION': {
    description: 'Research & Development Division',
    children: [
      'R&D Lab - Emerging Technologies',
      'Innovation & Prototyping',
      'Patent & IP Management'
    ]
  }
};

async function createTechDepartments() {
  try {
    console.log('🚀 Starting department creation for General 0 - Technology...\n');

    // Find General 0
    const general = await General.findOne({
      where: { name: 'general 0' }
    });

    if (!general) {
      console.error('❌ General 0 not found!');
      return;
    }

    console.log(`✅ Found General: ${general.name} (ID: ${general.id})\n`);

    let orderNum = 1;
    let totalCreated = 0;

    // Create parent departments and their children
    for (const [parentName, config] of Object.entries(departmentStructure)) {
      console.log(`📁 Creating parent department: ${parentName}`);

      // Create parent department
      const parentDept = await Department.create({
        name: parentName,
        description: config.description,
        generalId: general.id,
        parentDepartmentId: null, // Top level
        orderNumber: orderNum++,
        status: 'active'
      });

      console.log(`   ✅ Created: ${parentDept.name} (ID: ${parentDept.id})`);
      totalCreated++;

      // Create child departments
      console.log(`   Creating ${config.children.length} child departments...`);
      let childOrder = 1;

      for (const childName of config.children) {
        const childDept = await Department.create({
          name: childName,
          description: `${childName} under ${parentName}`,
          generalId: general.id,
          parentDepartmentId: parentDept.id, // Link to parent
          orderNumber: childOrder++,
          status: 'active'
        });

        console.log(`      ├─ ${childDept.name}`);
        totalCreated++;
      }

      console.log('');
    }

    console.log(`\n🎉 SUCCESS! Created ${totalCreated} departments for General 0 - Technology`);
    console.log(`   - 3 parent departments`);
    console.log(`   - ${totalCreated - 3} child departments\n`);

  } catch (error) {
    console.error('❌ Error creating departments:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  createTechDepartments()
    .then(() => {
      console.log('✅ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = createTechDepartments;
