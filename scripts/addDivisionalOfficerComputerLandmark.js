require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const Person = require('../models/Person');

async function addDivisionalOfficerComputerLandmark() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Find the High Commander person
    const highCommander = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (!highCommander) {
      console.error('❌ High Commander not found!');
      process.exit(1);
    }

    console.log(`📍 Creating Divisional Officer Computer Setup landmark for: ${highCommander.fullName}\n`);

    const landmark = {
      title: 'Setup Computer - Divisional Officer Southwest Cameroon',
      description: 'Ensure the computer of the divisional officer of Southwest Cameroon is fully set up and operational. Complete all installations, configurations, and testing.',
      personId: highCommander.id,
      generalId: null,
      startDate: new Date('2026-03-19T00:00:00Z'),
      endDate: new Date('2026-03-26T23:59:59Z'),
      amount: null,
      currency: 'XAF',
      paymentStatus: 'n/a',
      amountPaid: 0,
      status: 'in_progress',
      priority: 'urgent',
      progress: 0,
      category: 'Business',
      tags: ['computer-setup', 'government', 'it-support', 'southwest-cameroon', 'divisional-officer'],
      notes: 'URGENT: Complete computer setup for Divisional Officer of Southwest Cameroon by Thursday, March 26, 2026. Ensure all systems are operational and tested.',
      checklist: [
        { id: 1, text: 'Check hardware components (monitor, keyboard, mouse, cables)', completed: false },
        { id: 2, text: 'Install/Update operating system (Windows/Linux)', completed: false },
        { id: 3, text: 'Install essential software (Office suite, PDF reader, etc.)', completed: false },
        { id: 4, text: 'Configure network and internet connection', completed: false },
        { id: 5, text: 'Setup email accounts and configure email client', completed: false },
        { id: 6, text: 'Install antivirus and security software', completed: false },
        { id: 7, text: 'Configure user accounts and permissions', completed: false },
        { id: 8, text: 'Setup printers and scanners', completed: false },
        { id: 9, text: 'Install government/official software applications', completed: false },
        { id: 10, text: 'Configure backups and data security', completed: false },
        { id: 11, text: 'Test all systems and applications', completed: false },
        { id: 12, text: 'Provide user training/documentation', completed: false },
        { id: 13, text: 'Final inspection and sign-off', completed: false }
      ],
      reminderDays: 1,
      photos: []
    };

    console.log('📝 Creating landmark...\n');

    const createdLandmark = await Landmark.create(landmark);
    console.log(`✅ Created: ${createdLandmark.title}`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ DIVISIONAL OFFICER COMPUTER SETUP LANDMARK CREATED! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n💻 Landmark: ${createdLandmark.title}`);
    console.log(`🎯 Priority: ${createdLandmark.priority.toUpperCase()}`);
    console.log(`📅 Deadline: Thursday, March 26, 2026`);
    console.log(`📍 Location: Southwest Cameroon - Divisional Officer`);
    console.log(`👤 Assigned to: ${highCommander.fullName}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating landmark:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

addDivisionalOfficerComputerLandmark();
