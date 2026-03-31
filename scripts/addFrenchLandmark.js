require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const Person = require('../models/Person');

async function addFrenchLandmark() {
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

    console.log(`📍 Creating French language landmark for: ${highCommander.fullName}\n`);

    const landmark = {
      title: 'Learn French Language',
      description: 'Complete French language learning by the end of 2026. Focus on conversational fluency, reading, and writing skills.',
      personId: highCommander.id,
      generalId: null,
      startDate: new Date('2026-03-19T00:00:00Z'),
      endDate: new Date('2026-12-31T23:59:59Z'),
      amount: null,
      currency: 'XAF',
      paymentStatus: 'n/a',
      amountPaid: 0,
      status: 'pending',
      priority: 'high',
      progress: 0,
      category: 'Personal Development',
      tags: ['language', 'french', 'education', 'self-improvement'],
      notes: 'Goal: Achieve conversational fluency in French by end of year 2026.',
      checklist: [
        { id: 1, text: 'Choose French learning platform/course', completed: false },
        { id: 2, text: 'Complete A1 level (Beginner)', completed: false },
        { id: 3, text: 'Complete A2 level (Elementary)', completed: false },
        { id: 4, text: 'Complete B1 level (Intermediate)', completed: false },
        { id: 5, text: 'Complete B2 level (Upper Intermediate)', completed: false },
        { id: 6, text: 'Practice daily conversation (30 mins/day)', completed: false },
        { id: 7, text: 'Watch French movies/shows regularly', completed: false },
        { id: 8, text: 'Read French books/articles weekly', completed: false },
        { id: 9, text: 'Take proficiency test', completed: false },
        { id: 10, text: 'Achieve conversational fluency', completed: false }
      ],
      reminderDays: 30,
      photos: []
    };

    console.log('📝 Creating landmark...\n');

    const createdLandmark = await Landmark.create(landmark);
    console.log(`✅ Created: ${createdLandmark.title}`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ FRENCH LANGUAGE LANDMARK CREATED! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📚 Landmark: ${createdLandmark.title}`);
    console.log(`🎯 Priority: ${createdLandmark.priority}`);
    console.log(`📅 Deadline: December 31, 2026`);
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

addFrenchLandmark();
