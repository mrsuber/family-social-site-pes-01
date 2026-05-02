require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const Person = require('../models/Person');

async function addSamsungS23VideoEquipmentLandmark() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Find the High Commander
    const highCommander = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (!highCommander) {
      console.error('❌ High Commander not found.');
      process.exit(1);
    }

    console.log(`📍 Creating personal landmark for: ${highCommander.fullName}\n`);

    // First, delete any existing landmark with the same title
    const existingLandmark = await Landmark.findOne({
      where: { title: 'Acquire Samsung S23 & Professional Video Equipment' }
    });

    if (existingLandmark) {
      console.log('🗑️  Deleting existing landmark...\n');
      await existingLandmark.destroy();
      console.log('✅ Existing landmark deleted\n');
    }

    const landmarkData = {
      title: 'Acquire Samsung S23 & Professional Video Equipment',
      description: 'Purchase fairly used Samsung S23 smartphone with high-quality camera, professional microphone, ring light, and additional lighting equipment. This investment will enable high-quality video content creation for social media projects and accelerate content production capabilities.',
      personId: highCommander.id,
      generalId: null,
      startDate: new Date('2026-04-19T00:00:00Z'), // Today
      endDate: new Date('2026-05-31T23:59:59Z'), // End of May
      amount: 250000, // Samsung S23 + microphone + ring light + lighting
      currency: 'XAF',
      paymentStatus: 'pending',
      amountPaid: 0,
      status: 'pending',
      priority: 'high',
      progress: 0,
      category: 'Content Creation Equipment',
      tags: ['samsung-s23', 'video-equipment', 'microphone', 'ring-light', 'lighting', 'content-creation', 'social-media', 'video-production'],
      notes: 'High-priority equipment acquisition for launching professional video content production. The Samsung S23 offers excellent camera quality for video shoots. Professional audio and lighting equipment will ensure high-quality content output. Target completion by end of May 2026.',
      checklist: [
        { id: 1, text: 'Research Samsung S23 market prices and condition standards', completed: false },
        { id: 2, text: 'Find reliable sellers for fairly used Samsung S23', completed: false },
        { id: 3, text: 'Inspect Samsung S23 condition (battery health, camera, screen)', completed: false },
        { id: 4, text: 'Verify Samsung S23 IMEI and authenticity', completed: false },
        { id: 5, text: 'Research professional microphone options for video', completed: false },
        { id: 6, text: 'Research ring light specifications and prices', completed: false },
        { id: 7, text: 'Research additional lighting equipment needs', completed: false },
        { id: 8, text: 'Create equipment budget breakdown', completed: false },
        { id: 9, text: 'Secure funding (250,000 XAF)', completed: false },
        { id: 10, text: 'Purchase Samsung S23', completed: false },
        { id: 11, text: 'Purchase professional microphone', completed: false },
        { id: 12, text: 'Purchase ring light', completed: false },
        { id: 13, text: 'Purchase additional lighting equipment', completed: false },
        { id: 14, text: 'Test all equipment together', completed: false },
        { id: 15, text: 'Set up video recording workspace', completed: false },
        { id: 16, text: 'Learn equipment operation and best practices', completed: false },
        { id: 17, text: 'Create first test video shoot', completed: false },
        { id: 18, text: 'Launch social media content production', completed: false }
      ],
      reminderDays: 7
    };

    console.log('📝 Creating Samsung S23 & Video Equipment landmark...\n');

    const landmark = await Landmark.create(landmarkData);
    console.log(`✅ Created: ${landmark.title}`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ SAMSUNG S23 & VIDEO EQUIPMENT LANDMARK CREATED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📊 Landmark Details:`);
    console.log(`   Assigned To: ${highCommander.fullName} (High Commander)`);
    console.log(`   Title: ${landmark.title}`);
    console.log(`   Category: ${landmark.category}`);
    console.log(`   Priority: ${landmark.priority}`);
    console.log(`   Budget: ${landmark.amount.toLocaleString()} ${landmark.currency}`);
    console.log(`   Timeline: ${landmark.startDate.toLocaleDateString()} - ${landmark.endDate.toLocaleDateString()}`);
    console.log(`   Checklist Items: ${landmarkData.checklist.length}`);
    console.log(`   PersonID: ${landmark.personId}`);
    console.log(`   GeneralID: ${landmark.generalId || 'null (personal landmark)'}`);
    console.log('\n📱 Equipment to acquire:');
    console.log(`   • Samsung S23 (fairly used, high camera quality)`);
    console.log(`   • Professional microphone for video recording`);
    console.log(`   • Ring light for consistent lighting`);
    console.log(`   • Additional lighting equipment as needed`);
    console.log('\n🎯 Goal: Enable professional video content creation for social media projects\n');

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

addSamsungS23VideoEquipmentLandmark();
