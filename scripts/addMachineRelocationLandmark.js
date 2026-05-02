require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const Person = require('../models/Person');

async function addMachineRelocationLandmark() {
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
      where: { title: 'Relocate Sewing & Embroidery Machines from Shop to House' }
    });

    if (existingLandmark) {
      console.log('🗑️  Deleting existing landmark...\n');
      await existingLandmark.destroy();
      console.log('✅ Existing landmark deleted\n');
    }

    const landmarkData = {
      title: 'Relocate Sewing & Embroidery Machines from Shop to House',
      description: 'Transfer all tailoring, sewing, and embroidery machines from the shop to the house due to high shop rental costs. This will allow sewing operations to continue from home, significantly reducing overhead expenses while maintaining production capabilities.',
      personId: highCommander.id,
      generalId: null,
      startDate: new Date('2026-04-17T00:00:00Z'), // Today
      endDate: new Date('2026-05-15T23:59:59Z'), // About a month to complete
      amount: 150000, // Estimated cost for transportation, setup, electrical work
      currency: 'XAF',
      paymentStatus: 'pending',
      amountPaid: 0,
      status: 'pending',
      priority: 'high',
      progress: 0,
      category: 'Business Operations',
      tags: ['relocation', 'machines', 'sewing', 'embroidery', 'tailoring', 'cost-reduction', 'shop-closure'],
      notes: 'Moving machines to house to reduce expensive shop rental costs. Need to ensure proper electrical setup, adequate workspace, and safe transportation of delicate equipment.',
      checklist: [
        { id: 1, text: 'Assess house space and layout for machine placement', completed: false },
        { id: 2, text: 'Check electrical capacity and wiring requirements', completed: false },
        { id: 3, text: 'Arrange electrical upgrades if needed (outlets, circuits)', completed: false },
        { id: 4, text: 'Inventory all machines to be moved', completed: false },
        { id: 5, text: 'Create floor plan for machine arrangement at house', completed: false },
        { id: 6, text: 'Hire transportation for machines', completed: false },
        { id: 7, text: 'Pack and prepare machines for safe transport', completed: false },
        { id: 8, text: 'Transport chain embroidery machine', completed: false },
        { id: 9, text: 'Transport industrial sewing machines', completed: false },
        { id: 10, text: 'Transport manual sewing machines', completed: false },
        { id: 11, text: 'Transport embroidery equipment and accessories', completed: false },
        { id: 12, text: 'Install and set up machines in new location', completed: false },
        { id: 13, text: 'Test all machines for proper operation', completed: false },
        { id: 14, text: 'Organize workspace and materials storage', completed: false },
        { id: 15, text: 'Close shop lease agreement', completed: false }
      ],
      reminderDays: 7
    };

    console.log('📝 Creating machine relocation landmark...\n');

    const landmark = await Landmark.create(landmarkData);
    console.log(`✅ Created: ${landmark.title}`);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ MACHINE RELOCATION LANDMARK CREATED SUCCESSFULLY! ✨');
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
    console.log('');

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

addMachineRelocationLandmark();
