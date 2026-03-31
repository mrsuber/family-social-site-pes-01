const { sequelize } = require('../config/db');
const General = require('../models/General');
const Department = require('../models/Department');
const Person = require('../models/Person');

// Personnel data structure
const personnelStructure = {
  // General 0 commander
  general: {
    fullName: 'Dr. Sarah Chen',
    title: 'General - Technology Division',
    relationshipType: 'general',
    email: 'sarah.chen@tech.mil',
    performanceRating: 95
  },

  // Parent department commanders (Colonels)
  parentDepartments: {
    SOFTWARE: {
      fullName: 'Col. Marcus Thompson',
      title: 'Colonel - Software Engineering Division',
      relationshipType: 'colonel',
      email: 'marcus.thompson@tech.mil',
      performanceRating: 92
    },
    HARDWARE: {
      fullName: 'Col. Jennifer Park',
      title: 'Colonel - Hardware Engineering Division',
      relationshipType: 'colonel',
      email: 'jennifer.park@tech.mil',
      performanceRating: 93
    },
    'RESEARCH & INNOVATION': {
      fullName: 'Col. David Rodriguez',
      title: 'Colonel - Research & Innovation Division',
      relationshipType: 'colonel',
      email: 'david.rodriguez@tech.mil',
      performanceRating: 94
    }
  },

  // Child department personnel
  childDepartments: {
    'Backend Engineering': {
      fullName: 'Maj. Alex Kumar',
      title: 'Major - Backend Engineering Lead',
      relationshipType: 'major',
      email: 'alex.kumar@tech.mil',
      performanceRating: 88
    },
    'Frontend Engineering': {
      fullName: 'Maj. Emily Watson',
      title: 'Major - Frontend Engineering Lead',
      relationshipType: 'major',
      email: 'emily.watson@tech.mil',
      performanceRating: 87
    },
    'Mobile Development': {
      fullName: 'Capt. James Lee',
      title: 'Captain - Mobile Development Lead',
      relationshipType: 'captain',
      email: 'james.lee@tech.mil',
      performanceRating: 85
    },
    'API & Integration': {
      fullName: 'Capt. Maria Garcia',
      title: 'Captain - API & Integration Lead',
      relationshipType: 'captain',
      email: 'maria.garcia@tech.mil',
      performanceRating: 86
    },
    'Database Engineering': {
      fullName: 'Maj. Robert Chen',
      title: 'Major - Database Engineering Lead',
      relationshipType: 'major',
      email: 'robert.chen@tech.mil',
      performanceRating: 89
    },
    'Machine Learning Engineering': {
      fullName: 'Maj. Lisa Patel',
      title: 'Major - ML Engineering Lead',
      relationshipType: 'major',
      email: 'lisa.patel@tech.mil',
      performanceRating: 91
    },
    'AI Research': {
      fullName: 'Lt.Col. Michael Zhang',
      title: 'Lieutenant Colonel - AI Research Lead',
      relationshipType: 'lieutenant_colonel',
      email: 'michael.zhang@tech.mil',
      performanceRating: 93
    },
    'Data Science & Analytics': {
      fullName: 'Maj. Rachel Green',
      title: 'Major - Data Science Lead',
      relationshipType: 'major',
      email: 'rachel.green@tech.mil',
      performanceRating: 88
    },
    'Computer Vision': {
      fullName: 'Capt. Daniel Kim',
      title: 'Captain - Computer Vision Lead',
      relationshipType: 'captain',
      email: 'daniel.kim@tech.mil',
      performanceRating: 87
    },
    'Natural Language Processing': {
      fullName: 'Capt. Sophie Martinez',
      title: 'Captain - NLP Lead',
      relationshipType: 'captain',
      email: 'sophie.martinez@tech.mil',
      performanceRating: 88
    },
    'Cloud Infrastructure': {
      fullName: 'Maj. Thomas Anderson',
      title: 'Major - Cloud Infrastructure Lead',
      relationshipType: 'major',
      email: 'thomas.anderson@tech.mil',
      performanceRating: 90
    },
    'DevOps & Automation': {
      fullName: 'Capt. Jessica Brown',
      title: 'Captain - DevOps Lead',
      relationshipType: 'captain',
      email: 'jessica.brown@tech.mil',
      performanceRating: 86
    },
    'Platform Engineering': {
      fullName: 'Maj. Kevin O\'Brien',
      title: 'Major - Platform Engineering Lead',
      relationshipType: 'major',
      email: 'kevin.obrien@tech.mil',
      performanceRating: 87
    },
    'Cybersecurity': {
      fullName: 'Lt.Col. Amanda Torres',
      title: 'Lieutenant Colonel - Cybersecurity Lead',
      relationshipType: 'lieutenant_colonel',
      email: 'amanda.torres@tech.mil',
      performanceRating: 92
    },
    'Quality Assurance & Testing': {
      fullName: 'Capt. Ryan Mitchell',
      title: 'Captain - QA Lead',
      relationshipType: 'captain',
      email: 'ryan.mitchell@tech.mil',
      performanceRating: 85
    },
    'Electronics Design': {
      fullName: 'Maj. Steven Wright',
      title: 'Major - Electronics Design Lead',
      relationshipType: 'major',
      email: 'steven.wright@tech.mil',
      performanceRating: 88
    },
    'PCB Design & Layout': {
      fullName: 'Capt. Nicole Adams',
      title: 'Captain - PCB Design Lead',
      relationshipType: 'captain',
      email: 'nicole.adams@tech.mil',
      performanceRating: 84
    },
    'Embedded Systems': {
      fullName: 'Maj. Christopher Hall',
      title: 'Major - Embedded Systems Lead',
      relationshipType: 'major',
      email: 'christopher.hall@tech.mil',
      performanceRating: 89
    },
    'IoT Engineering': {
      fullName: 'Capt. Lauren Scott',
      title: 'Captain - IoT Engineering Lead',
      relationshipType: 'captain',
      email: 'lauren.scott@tech.mil',
      performanceRating: 86
    },
    'Semiconductor Design': {
      fullName: 'Lt.Col. Andrew Wilson',
      title: 'Lieutenant Colonel - Semiconductor Design Lead',
      relationshipType: 'lieutenant_colonel',
      email: 'andrew.wilson@tech.mil',
      performanceRating: 91
    },
    'VLSI & Chip Architecture': {
      fullName: 'Maj. Patricia Moore',
      title: 'Major - VLSI & Chip Architecture Lead',
      relationshipType: 'major',
      email: 'patricia.moore@tech.mil',
      performanceRating: 90
    },
    'FPGA Development': {
      fullName: 'Capt. Brian Taylor',
      title: 'Captain - FPGA Development Lead',
      relationshipType: 'captain',
      email: 'brian.taylor@tech.mil',
      performanceRating: 85
    },
    'ASIC Design': {
      fullName: 'Maj. Michelle Davis',
      title: 'Major - ASIC Design Lead',
      relationshipType: 'major',
      email: 'michelle.davis@tech.mil',
      performanceRating: 89
    },
    'Manufacturing Engineering': {
      fullName: 'Maj. Joseph Martinez',
      title: 'Major - Manufacturing Engineering Lead',
      relationshipType: 'major',
      email: 'joseph.martinez@tech.mil',
      performanceRating: 87
    },
    'Chip Fabrication': {
      fullName: 'Capt. Elizabeth Johnson',
      title: 'Captain - Chip Fabrication Lead',
      relationshipType: 'captain',
      email: 'elizabeth.johnson@tech.mil',
      performanceRating: 86
    },
    'Hardware Testing & QA': {
      fullName: 'Capt. Matthew Robinson',
      title: 'Captain - Hardware Testing Lead',
      relationshipType: 'captain',
      email: 'matthew.robinson@tech.mil',
      performanceRating: 84
    },
    'Supply Chain & Logistics': {
      fullName: 'Maj. Sarah Williams',
      title: 'Major - Supply Chain Lead',
      relationshipType: 'major',
      email: 'sarah.williams@tech.mil',
      performanceRating: 88
    },
    'R&D Lab - Emerging Technologies': {
      fullName: 'Lt.Col. Gregory Foster',
      title: 'Lieutenant Colonel - R&D Lab Lead',
      relationshipType: 'lieutenant_colonel',
      email: 'gregory.foster@tech.mil',
      performanceRating: 92
    },
    'Innovation & Prototyping': {
      fullName: 'Maj. Angela Turner',
      title: 'Major - Innovation Lead',
      relationshipType: 'major',
      email: 'angela.turner@tech.mil',
      performanceRating: 89
    },
    'Patent & IP Management': {
      fullName: 'Capt. Richard Coleman',
      title: 'Captain - Patent & IP Lead',
      relationshipType: 'captain',
      email: 'richard.coleman@tech.mil',
      performanceRating: 87
    }
  }
};

async function createTechPersonnel() {
  try {
    console.log('🚀 Starting personnel creation for General 0 - Technology...\\n');

    // Find General 0
    const general = await General.findOne({
      where: { name: 'general 0' }
    });

    if (!general) {
      console.error('❌ General 0 not found!');
      return;
    }

    console.log(`✅ Found General: ${general.name} (ID: ${general.id})\\n`);

    let totalCreated = 0;

    // 1. Create the General commander (assigned to General 0, no department)
    console.log('👤 Creating General Commander...');
    const generalCommander = await Person.create({
      ...personnelStructure.general,
      generalId: general.id,
      departmentId: null, // General commands the whole division, not a specific department
      status: 'active'
    });
    console.log(`   ✅ Created: ${generalCommander.fullName} - ${generalCommander.title}\\n`);
    totalCreated++;

    // 2. Find all parent departments and create Colonels
    console.log('👥 Creating Parent Department Commanders (Colonels)...');
    const parentDepartments = await Department.findAll({
      where: {
        generalId: general.id,
        parentDepartmentId: null
      }
    });

    for (const dept of parentDepartments) {
      const personnelData = personnelStructure.parentDepartments[dept.name];
      if (personnelData) {
        const colonel = await Person.create({
          ...personnelData,
          generalId: general.id,
          departmentId: dept.id,
          status: 'active'
        });
        console.log(`   ✅ ${colonel.fullName} → ${dept.name}`);
        totalCreated++;
      }
    }

    console.log('');

    // 3. Find all child departments and create personnel
    console.log('👥 Creating Child Department Personnel...');
    const childDepartments = await Department.findAll({
      where: {
        generalId: general.id,
        parentDepartmentId: { [require('sequelize').Op.not]: null }
      }
    });

    for (const dept of childDepartments) {
      const personnelData = personnelStructure.childDepartments[dept.name];
      if (personnelData) {
        const person = await Person.create({
          ...personnelData,
          generalId: general.id,
          departmentId: dept.id,
          status: 'active'
        });
        console.log(`   ✅ ${person.fullName} → ${dept.name}`);
        totalCreated++;
      } else {
        console.log(`   ⚠️  No personnel defined for: ${dept.name}`);
      }
    }

    console.log(`\\n🎉 SUCCESS! Created ${totalCreated} personnel for General 0 - Technology`);
    console.log(`   - 1 General Commander`);
    console.log(`   - 3 Colonels (Parent Department Commanders)`);
    console.log(`   - ${totalCreated - 4} Department Personnel\\n`);

  } catch (error) {
    console.error('❌ Error creating personnel:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  createTechPersonnel()
    .then(() => {
      console.log('✅ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = createTechPersonnel;
