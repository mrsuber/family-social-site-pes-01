require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const Person = require('../models/Person');

async function addNationalIdLandmark() {
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

    console.log(`📍 Creating National ID Card landmark for: ${highCommander.fullName}\n`);

    const landmark = {
      title: 'Make National ID Card',
      description: 'Renew national ID card. Current ID has expired and needs replacement.',
      personId: highCommander.id,
      generalId: null,
      startDate: new Date('2026-03-19T00:00:00Z'),
      endDate: new Date('2026-04-30T23:59:59Z'),
      amount: 25000,
      currency: 'XAF',
      paymentStatus: 'pending',
      amountPaid: 0,
      status: 'pending',
      priority: 'high',
      progress: 0,
      category: 'Personal',
      tags: ['id-card', 'government', 'documentation', 'renewal'],
      notes: 'Priority: Renew expired national ID card by end of April 2026. Budget: 25,000 XAF',
      checklist: [
        { id: 1, text: 'Gather required documents (birth certificate, proof of address, etc.)', completed: false },
        { id: 2, text: 'Get passport photos (recent)', completed: false },
        { id: 3, text: 'Visit government office or ID center', completed: false },
        { id: 4, text: 'Fill out application form', completed: false },
        { id: 5, text: 'Submit documents and application', completed: false },
        { id: 6, text: 'Pay processing fee (25,000 XAF)', completed: false },
        { id: 7, text: 'Get receipt and tracking number', completed: false },
        { id: 8, text: 'Follow up on application status', completed: false },
        { id: 9, text: 'Collect new ID card', completed: false }
      ],
      reminderDays: 7,
      photos: []
    };

    console.log('📝 Creating landmark...\n');

    const createdLandmark = await Landmark.create(landmark);
    console.log(`✅ Created: ${createdLandmark.title}`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ NATIONAL ID CARD LANDMARK CREATED! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📄 Landmark: ${createdLandmark.title}`);
    console.log(`🎯 Priority: ${createdLandmark.priority}`);
    console.log(`📅 Deadline: April 30, 2026`);
    console.log(`💰 Budget: ${createdLandmark.amount.toLocaleString()} ${createdLandmark.currency}`);
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

addNationalIdLandmark();
