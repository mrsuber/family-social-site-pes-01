require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const General = require('../models/General');
const Person = require('../models/Person');

async function fixHighCommanderLandmarks() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Find and delete the incorrectly created General
    console.log('🗑️  Deleting incorrect "High Commander - Personal Goals" General...');
    const wrongGeneral = await General.findOne({
      where: { name: 'High Commander - Personal Goals' }
    });

    if (wrongGeneral) {
      // Delete all landmarks associated with this general
      await Landmark.destroy({
        where: { generalId: wrongGeneral.id }
      });
      console.log('✅ Deleted old landmarks');

      // Delete the general
      await wrongGeneral.destroy();
      console.log('✅ Deleted incorrect General\n');
    } else {
      console.log('ℹ️  No incorrect General found\n');
    }

    // Find the High Commander person
    const highCommander = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (!highCommander) {
      console.error('❌ High Commander not found!');
      process.exit(1);
    }

    console.log(`📍 Creating landmarks for: ${highCommander.fullName}\n`);

    const landmarks = [
      {
        title: 'Fix Chain Embroidery Machine Motor',
        description: 'Came to Bafoussam to fix the motor of the chain embroidery machine that burned. Repairs in progress, will count as done once installed back to the machine in Buea and is working.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-01T00:00:00Z'),
        endDate: new Date('2026-03-31T23:59:59Z'),
        amount: 20000,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 20000,
        status: 'processing',
        priority: 'high',
        progress: 50,
        category: 'Equipment Repair',
        tags: ['repair', 'embroidery', 'motor'],
        notes: 'Motor burned, repairs ongoing in Bafoussam. Will install back in Buea when complete.',
        checklist: [
          { id: 1, text: 'Assess motor damage', completed: true },
          { id: 2, text: 'Purchase replacement parts', completed: true },
          { id: 3, text: 'Complete repairs', completed: false },
          { id: 4, text: 'Test motor functionality', completed: false },
          { id: 5, text: 'Install back in Buea machine', completed: false },
          { id: 6, text: 'Verify machine working', completed: false }
        ],
        reminderDays: 7
      },
      {
        title: 'Fix or Replace Table Saw Motor',
        description: 'Fix or replace the motor for the table saw. Critical for woodworking operations.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-01T00:00:00Z'),
        endDate: new Date('2026-05-31T23:59:59Z'),
        amount: 150000,
        currency: 'XAF',
        paymentStatus: 'pending',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Equipment Repair',
        tags: ['repair', 'table-saw', 'motor', 'woodworking'],
        notes: 'Need to assess whether repair or replacement is more cost-effective.',
        checklist: [
          { id: 1, text: 'Assess motor condition', completed: false },
          { id: 2, text: 'Get repair quote', completed: false },
          { id: 3, text: 'Get replacement quote', completed: false },
          { id: 4, text: 'Make decision (repair vs replace)', completed: false },
          { id: 5, text: 'Complete work', completed: false },
          { id: 6, text: 'Test functionality', completed: false }
        ],
        reminderDays: 14
      },
      {
        title: 'Fix or Replace Wood Jointer/Planer Motor',
        description: 'Fix or replace the motor for the wood jointer/planer. Essential equipment for woodworking operations.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-01T00:00:00Z'),
        endDate: new Date('2026-05-31T23:59:59Z'),
        amount: 150000,
        currency: 'XAF',
        paymentStatus: 'pending',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Equipment Repair',
        tags: ['repair', 'jointer', 'planer', 'motor', 'woodworking'],
        notes: 'Need to assess whether repair or replacement is more cost-effective.',
        checklist: [
          { id: 1, text: 'Assess motor condition', completed: false },
          { id: 2, text: 'Get repair quote', completed: false },
          { id: 3, text: 'Get replacement quote', completed: false },
          { id: 4, text: 'Make decision (repair vs replace)', completed: false },
          { id: 5, text: 'Complete work', completed: false },
          { id: 6, text: 'Test functionality', completed: false }
        ],
        reminderDays: 14
      },
      {
        title: 'Purchase Drill Press',
        description: 'Purchase a new drill press for the workshop. Payment completed, awaiting delivery and setup.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-01T00:00:00Z'),
        endDate: new Date('2026-03-31T23:59:59Z'),
        amount: 100000,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 100000,
        status: 'processing',
        priority: 'medium',
        progress: 60,
        category: 'Equipment Purchase',
        tags: ['purchase', 'drill-press', 'equipment', 'woodworking'],
        notes: 'Payment completed. Waiting for delivery and installation.',
        checklist: [
          { id: 1, text: 'Research drill press options', completed: true },
          { id: 2, text: 'Get quotes', completed: true },
          { id: 3, text: 'Make purchase', completed: true },
          { id: 4, text: 'Arrange delivery', completed: false },
          { id: 5, text: 'Install and set up', completed: false },
          { id: 6, text: 'Test functionality', completed: false }
        ],
        reminderDays: 7
      },
      {
        title: 'Deploy MTN Orange Payment Gateway',
        description: 'Deploy and integrate MTN Orange payment gateway into the system.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-20T00:00:00Z'),
        endDate: new Date('2026-03-27T23:59:59Z'),
        amount: 14,
        currency: 'USD',
        paymentStatus: 'pending',
        amountPaid: 0,
        status: 'pending',
        priority: 'critical',
        progress: 0,
        category: 'Software Development',
        tags: ['payment-gateway', 'MTN', 'Orange', 'integration', 'deployment'],
        notes: 'Critical deadline: This Thursday to next Thursday',
        checklist: [
          { id: 1, text: 'Review MTN API documentation', completed: false },
          { id: 2, text: 'Review Orange API documentation', completed: false },
          { id: 3, text: 'Set up test credentials', completed: false },
          { id: 4, text: 'Implement MTN integration', completed: false },
          { id: 5, text: 'Implement Orange integration', completed: false },
          { id: 6, text: 'Test payment flows', completed: false },
          { id: 7, text: 'Deploy to production', completed: false },
          { id: 8, text: 'Verify live transactions', completed: false }
        ],
        reminderDays: 3
      },
      {
        title: 'Follow Up on Payment Gateway Integration',
        description: 'Follow up on payment gateway integration work. Ensure everything is working correctly and resolve any issues.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-20T00:00:00Z'),
        endDate: new Date('2026-03-27T23:59:59Z'),
        amount: null,
        currency: 'XAF',
        paymentStatus: 'n/a',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Software Development',
        tags: ['payment-gateway', 'follow-up', 'monitoring'],
        notes: 'Monitor payment gateway integration. Amount TBD based on any additional work required.',
        checklist: [
          { id: 1, text: 'Check deployment status', completed: false },
          { id: 2, text: 'Monitor transaction logs', completed: false },
          { id: 3, text: 'Test live transactions', completed: false },
          { id: 4, text: 'Document any issues', completed: false },
          { id: 5, text: 'Resolve critical bugs', completed: false },
          { id: 6, text: 'Optimize performance', completed: false }
        ],
        reminderDays: 3
      },
      {
        title: 'Close Camsol Technology Company',
        description: 'Complete the process of closing down Camsol Technology company. Handle all legal and administrative requirements.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-01T00:00:00Z'),
        endDate: new Date('2026-03-31T23:59:59Z'),
        amount: null,
        currency: 'XAF',
        paymentStatus: 'n/a',
        amountPaid: 0,
        status: 'pending',
        priority: 'medium',
        progress: 0,
        category: 'Business Administration',
        tags: ['company', 'closure', 'legal', 'administrative'],
        notes: 'Amount TBD - depends on legal fees and filing costs.',
        checklist: [
          { id: 1, text: 'Review company status', completed: false },
          { id: 2, text: 'Consult legal advisor', completed: false },
          { id: 3, text: 'Prepare closure documentation', completed: false },
          { id: 4, text: 'File legal paperwork', completed: false },
          { id: 5, text: 'Handle tax obligations', completed: false },
          { id: 6, text: 'Close bank accounts', completed: false },
          { id: 7, text: 'Archive records', completed: false }
        ],
        reminderDays: 10
      },
      {
        title: 'Talk with Khadija About General Position',
        description: 'Have a conversation with Khadija about taking on a General position in the organization.',
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-03-01T00:00:00Z'),
        endDate: new Date('2026-03-31T23:59:59Z'),
        amount: null,
        currency: 'XAF',
        paymentStatus: 'n/a',
        amountPaid: 0,
        status: 'pending',
        priority: 'medium',
        progress: 0,
        category: 'Leadership',
        tags: ['recruitment', 'leadership', 'general'],
        notes: 'Important conversation about organizational structure and leadership.',
        checklist: [
          { id: 1, text: 'Schedule meeting with Khadija', completed: false },
          { id: 2, text: 'Prepare position description', completed: false },
          { id: 3, text: 'Discuss responsibilities', completed: false },
          { id: 4, text: 'Discuss compensation', completed: false },
          { id: 5, text: 'Get decision', completed: false },
          { id: 6, text: 'Plan onboarding if accepted', completed: false }
        ],
        reminderDays: 7
      }
    ];

    console.log('📝 Creating landmarks...\n');

    for (const landmarkData of landmarks) {
      const landmark = await Landmark.create(landmarkData);
      console.log(`✅ Created: ${landmark.title}`);
    }

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ ALL LANDMARKS FIXED AND RECREATED! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📊 Total landmarks created: ${landmarks.length}`);
    console.log('🎯 All landmarks now attached to High Commander\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing landmarks:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

fixHighCommanderLandmarks();
