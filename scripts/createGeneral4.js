const General = require('../models/General');
const Department = require('../models/Department');
const { sequelize } = require('../config/db');

async function createGeneral4() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Create General 4: Research & Development
    const general4 = await General.create({
      name: 'Research & Development',
      description: 'The scientific brain of the organization. Fundamental research across all disciplines - physics, chemistry, biology, medicine, and energy. Nothing moves forward without scientific validation. Includes operational hospital for applied medical research and human adaptation for space travel.',
      orderNumber: 4,
      status: 'planning',
      objectives: [
        'Validate all scientific foundations before operational deployment',
        'Advance human biology for space travel adaptation',
        'Research alternative energy sources (nuclear fusion, advanced power systems)',
        'Operate hospital for applied medical research and healthcare',
        'Conduct fundamental research in physics, chemistry, and materials science',
        'Develop life support systems and environmental controls',
        'Clear all physics and biology requirements for space operations'
      ]
    });

    console.log('\n✅ General 4 created successfully!');
    console.log(`   Name: ${general4.name}`);
    console.log(`   Status: ${general4.status}`);
    console.log(`   ID: ${general4.id}`);

    // Create Parent Departments (6 main divisions)
    console.log('\n📋 Creating parent departments (6 divisions)...');

    const theoreticalSciences = await Department.create({
      name: 'Theoretical Sciences Division',
      description: 'Physics, chemistry, and mathematics laboratories. Fundamental research in quantum mechanics, relativity, particle physics, chemical reactions, and theoretical foundations.',
      generalId: general4.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 1,
      objectives: [
        'Conduct fundamental physics research',
        'Validate theoretical models before engineering',
        'Research quantum mechanics and relativity applications',
        'Chemistry research for materials and propulsion'
      ]
    });
    console.log(`   ✅ ${theoreticalSciences.name}`);

    const lifeSciences = await Department.create({
      name: 'Life Sciences & Medical Division',
      description: 'Human biology research, space medicine, genetic adaptation, and operational hospital. Focus on making humans suitable for space travel through medical advancement.',
      generalId: general4.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 2,
      objectives: [
        'Research human adaptation to space environments',
        'Operate hospital for applied medical research',
        'Develop treatments for space-related medical conditions',
        'Study long-term effects of microgravity on human biology'
      ]
    });
    console.log(`   ✅ ${lifeSciences.name}`);

    const energyResearch = await Department.create({
      name: 'Energy Research Division',
      description: 'Nuclear fusion, alternative energy sources, power generation, and energy storage systems. Critical for long-duration space missions and sustainable operations.',
      generalId: general4.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 3,
      objectives: [
        'Research nuclear fusion for spacecraft power',
        'Develop alternative energy sources',
        'Optimize energy storage and distribution',
        'Validate power systems for extreme environments'
      ]
    });
    console.log(`   ✅ ${energyResearch.name}`);

    const engineeringSciences = await Department.create({
      name: 'Engineering Sciences Division',
      description: 'Materials science, propulsion systems, structural engineering, and life support. Bridge between theoretical research and practical application.',
      generalId: general4.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 4,
      objectives: [
        'Develop advanced materials for extreme environments',
        'Research propulsion system technologies',
        'Design life support and environmental control systems',
        'Engineer structures for space applications'
      ]
    });
    console.log(`   ✅ ${engineeringSciences.name}`);

    const appliedTechnology = await Department.create({
      name: 'Applied Technology Division',
      description: 'Autonomous systems, artificial intelligence, communications, and computational research. Software and control systems for all operations.',
      generalId: general4.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 5,
      objectives: [
        'Develop AI and autonomous systems',
        'Research advanced communication systems',
        'Build computational models and simulations',
        'Create control systems for complex operations'
      ]
    });
    console.log(`   ✅ ${appliedTechnology.name}`);

    const testingValidation = await Department.create({
      name: 'Testing & Validation Division',
      description: 'Prototyping facilities, testing equipment, certification labs, and validation protocols. Ensures all research meets safety and performance standards.',
      generalId: general4.id,
      status: 'planning',
      parentDepartmentId: null,
      orderNumber: 6,
      objectives: [
        'Test and validate all research outputs',
        'Operate prototyping facilities',
        'Certify systems for operational deployment',
        'Maintain safety and quality standards'
      ]
    });
    console.log(`   ✅ ${testingValidation.name}`);

    // Create Child Departments
    console.log('\n📦 Creating child departments...');

    const childDepartments = [
      // Theoretical Sciences Division Children
      {
        name: 'Physics Laboratory',
        description: 'Experimental and theoretical physics research. Quantum mechanics, particle physics, relativity, and fundamental forces.',
        generalId: general4.id,
        parentDepartmentId: theoreticalSciences.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Chemistry Laboratory',
        description: 'Chemical research for propulsion, materials, life support. Reaction kinetics, chemical synthesis, and molecular engineering.',
        generalId: general4.id,
        parentDepartmentId: theoreticalSciences.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Mathematics & Modeling',
        description: 'Mathematical modeling, simulations, computational theory, and algorithm development for all research areas.',
        generalId: general4.id,
        parentDepartmentId: theoreticalSciences.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Astrophysics Research',
        description: 'Space environment research, cosmic radiation, celestial mechanics, and orbital dynamics.',
        generalId: general4.id,
        parentDepartmentId: theoreticalSciences.id,
        status: 'planning',
        orderNumber: 4
      },

      // Life Sciences & Medical Division Children
      {
        name: 'Hospital Operations',
        description: 'Full-service hospital for applied medical research, patient care, surgical procedures, and clinical trials.',
        generalId: general4.id,
        parentDepartmentId: lifeSciences.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Space Medicine Research',
        description: 'Research on human health in space environments. Microgravity effects, radiation protection, and countermeasures.',
        generalId: general4.id,
        parentDepartmentId: lifeSciences.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Human Biology & Genetics',
        description: 'Genetic research, human adaptation, biological enhancement, and evolutionary medicine for space travel.',
        generalId: general4.id,
        parentDepartmentId: lifeSciences.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Biomedical Engineering',
        description: 'Medical devices, prosthetics, implants, and biotechnology for space applications.',
        generalId: general4.id,
        parentDepartmentId: lifeSciences.id,
        status: 'planning',
        orderNumber: 4
      },
      {
        name: 'Nutrition & Life Support Biology',
        description: 'Nutritional research, food science, hydroponics, and biological life support systems.',
        generalId: general4.id,
        parentDepartmentId: lifeSciences.id,
        status: 'planning',
        orderNumber: 5
      },

      // Energy Research Division Children
      {
        name: 'Nuclear Fusion Research',
        description: 'Fusion reactor development, plasma physics, and advanced nuclear energy for spacecraft propulsion and power.',
        generalId: general4.id,
        parentDepartmentId: energyResearch.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Alternative Energy Systems',
        description: 'Solar, antimatter, and exotic energy sources. Next-generation power generation research.',
        generalId: general4.id,
        parentDepartmentId: energyResearch.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Energy Storage & Batteries',
        description: 'Advanced battery technology, supercapacitors, and energy storage systems for space operations.',
        generalId: general4.id,
        parentDepartmentId: energyResearch.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Power Distribution Systems',
        description: 'Electrical systems, power management, grid design, and energy efficiency optimization.',
        generalId: general4.id,
        parentDepartmentId: energyResearch.id,
        status: 'planning',
        orderNumber: 4
      },

      // Engineering Sciences Division Children
      {
        name: 'Materials Science',
        description: 'Advanced materials research, composites, alloys, and materials for extreme environments.',
        generalId: general4.id,
        parentDepartmentId: engineeringSciences.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Propulsion Systems',
        description: 'Rocket engines, ion drives, plasma propulsion, and advanced propulsion technology research.',
        generalId: general4.id,
        parentDepartmentId: engineeringSciences.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Structural Engineering',
        description: 'Spacecraft structures, pressure vessels, thermal protection, and structural integrity for extreme conditions.',
        generalId: general4.id,
        parentDepartmentId: engineeringSciences.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Life Support Engineering',
        description: 'Environmental control, oxygen generation, water recycling, and closed-loop life support systems.',
        generalId: general4.id,
        parentDepartmentId: engineeringSciences.id,
        status: 'planning',
        orderNumber: 4
      },

      // Applied Technology Division Children
      {
        name: 'Artificial Intelligence Lab',
        description: 'Machine learning, neural networks, autonomous decision-making, and AI systems for space operations.',
        generalId: general4.id,
        parentDepartmentId: appliedTechnology.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Autonomous Systems',
        description: 'Robotics, autonomous navigation, self-healing systems, and unmanned operations.',
        generalId: general4.id,
        parentDepartmentId: appliedTechnology.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Communications Research',
        description: 'Deep space communications, quantum communications, and high-bandwidth data transmission.',
        generalId: general4.id,
        parentDepartmentId: appliedTechnology.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'High-Performance Computing',
        description: 'Supercomputing, simulations, data processing, and computational infrastructure.',
        generalId: general4.id,
        parentDepartmentId: appliedTechnology.id,
        status: 'planning',
        orderNumber: 4
      },

      // Testing & Validation Division Children
      {
        name: 'Prototyping Facilities',
        description: '3D printing, CNC machining, rapid prototyping, and fabrication labs for testing new designs.',
        generalId: general4.id,
        parentDepartmentId: testingValidation.id,
        status: 'planning',
        orderNumber: 1
      },
      {
        name: 'Environmental Testing',
        description: 'Vacuum chambers, thermal testing, radiation testing, and extreme environment simulation.',
        generalId: general4.id,
        parentDepartmentId: testingValidation.id,
        status: 'planning',
        orderNumber: 2
      },
      {
        name: 'Mechanical Testing',
        description: 'Stress testing, vibration analysis, fatigue testing, and structural validation.',
        generalId: general4.id,
        parentDepartmentId: testingValidation.id,
        status: 'planning',
        orderNumber: 3
      },
      {
        name: 'Certification & Standards',
        description: 'Safety certification, quality assurance, regulatory compliance, and standards development.',
        generalId: general4.id,
        parentDepartmentId: testingValidation.id,
        status: 'planning',
        orderNumber: 4
      },
      {
        name: 'Integration Lab',
        description: 'System integration, component testing, interface validation, and full-system testing.',
        generalId: general4.id,
        parentDepartmentId: testingValidation.id,
        status: 'planning',
        orderNumber: 5
      }
    ];

    for (const deptData of childDepartments) {
      const dept = await Department.create(deptData);
      console.log(`   ✅ ${dept.name}`);
    }

    console.log('\n🎉 General 4 (Research & Development) setup complete!');
    console.log(`   General: ${general4.name}`);
    console.log(`   Parent Departments: 6 (Scientific Divisions)`);
    console.log(`   Child Departments: ${childDepartments.length}`);
    console.log(`   Total Departments: ${6 + childDepartments.length}`);
    console.log(`   Status: PLANNING`);
    console.log('\n🧠 THE BRAIN: Nothing proceeds without scientific validation!');
    console.log('🏥 Includes operational hospital for applied medical research');
    console.log('⚛️  Nuclear fusion, human biology, physics - all fundamental sciences');
    console.log('📍 Next Steps: Assign Chief Research Officer, acquire lab equipment, establish hospital');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating General 4:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createGeneral4();
