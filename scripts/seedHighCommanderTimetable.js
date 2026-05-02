require('dotenv').config();
const { sequelize } = require('../config/db');
const Person = require('../models/Person');
const DailyTimetable = require('../models/DailyTimetable');

// Weekday time blocks template
const weekdayTimeBlocks = [
  {
    id: 1,
    startTime: '22:00',
    endTime: '05:00',
    title: 'Sleep',
    duration: '7h',
    category: 'rest',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 2,
    startTime: '05:00',
    endTime: '08:00',
    title: 'Deep Focus Software Work',
    duration: '3h',
    category: 'client-work',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Client projects (Abba contract) - PRIMARY INCOME SOURCE'
  },
  {
    id: 3,
    startTime: '08:00',
    endTime: '09:00',
    title: 'Break/Breakfast',
    duration: '1h',
    category: 'break',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 4,
    startTime: '09:00',
    endTime: '09:30',
    title: 'SuberCraftex Daily Planning',
    duration: '30m',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Plan the day\'s SuberCraftex work, prioritize tasks'
  },
  {
    id: 5,
    startTime: '09:30',
    endTime: '10:30',
    title: 'Active SuberCraftex Work',
    duration: '1h',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Execute: product creation, filming, design, curriculum work'
  },
  {
    id: 6,
    startTime: '10:30',
    endTime: '11:30',
    title: 'Progress Review & Wrap-Up',
    duration: '1h',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Document progress, conclude tasks, prepare handoff'
  },
  {
    id: 7,
    startTime: '11:30',
    endTime: '12:00',
    title: 'Final Conclusion',
    duration: '30m',
    category: 'subercraftex',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Close out SuberCraftex work session'
  },
  {
    id: 8,
    startTime: '12:00',
    endTime: '13:00',
    title: 'Break/Lunch',
    duration: '1h',
    category: 'break',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 9,
    startTime: '13:00',
    endTime: '15:00',
    title: 'Islam Study/Practice',
    duration: '2h',
    category: 'spiritual',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Quran, prayer, Islamic education, spiritual growth'
  },
  {
    id: 10,
    startTime: '15:00',
    endTime: '17:00',
    title: 'Sales, Marketing & Outreach',
    duration: '2h',
    category: 'business-development',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Client visits, marketing, posting online, engagement, sales calls'
  },
  {
    id: 11,
    startTime: '17:00',
    endTime: '22:00',
    title: 'Socializing & Family Time',
    duration: '5h',
    category: 'personal',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Fauzia, family, friends, personal relationships, relaxation'
  }
];

// Weekend time blocks template
const weekendTimeBlocks = [
  {
    id: 1,
    startTime: '22:00',
    endTime: '07:00',
    title: 'Sleep',
    duration: '9h',
    category: 'rest',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Extra sleep on weekends'
  },
  {
    id: 2,
    startTime: '07:00',
    endTime: '09:00',
    title: 'Morning Routine & Breakfast',
    duration: '2h',
    category: 'personal',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 3,
    startTime: '09:00',
    endTime: '12:00',
    title: 'Video Editing Session 1',
    duration: '3h',
    category: 'content-creation',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Edit weekly video content'
  },
  {
    id: 4,
    startTime: '12:00',
    endTime: '13:00',
    title: 'Lunch Break',
    duration: '1h',
    category: 'break',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null
  },
  {
    id: 5,
    startTime: '13:00',
    endTime: '16:00',
    title: 'Video Editing Session 2',
    duration: '3h',
    category: 'content-creation',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Continue editing or start new video'
  },
  {
    id: 6,
    startTime: '16:00',
    endTime: '17:00',
    title: 'Social Media Posting',
    duration: '1h',
    category: 'content-creation',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Post weekly video, engage with audience'
  },
  {
    id: 7,
    startTime: '17:00',
    endTime: '22:00',
    title: 'Rewiring/Rest/Family Time',
    duration: '5h',
    category: 'personal',
    status: 'pending',
    completed: false,
    skipped: false,
    notes: '',
    completedAt: null,
    description: 'Decompress, reflect, recharge for next week'
  }
];

async function seedHighCommanderTimetable() {
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

    console.log(`📅 Creating timetable template for: ${highCommander.fullName}\n`);

    // Create today's timetable as example
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const todayTimetable = {
      personId: highCommander.id,
      date: today.toISOString().split('T')[0],
      dayType: isWeekend ? 'weekend' : 'weekday',
      timeBlocks: isWeekend ? weekendTimeBlocks : weekdayTimeBlocks,
      overallCompletion: 0,
      adherenceScore: 0,
      energyLevel: 3,
      isCompleted: false
    };

    // Delete existing timetable for today if it exists
    await DailyTimetable.destroy({
      where: {
        personId: highCommander.id,
        date: todayTimetable.date
      }
    });

    const timetable = await DailyTimetable.create(todayTimetable);

    console.log('✅ Created timetable for today\n');

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ HIGH COMMANDER TIMETABLE TEMPLATE CREATED! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📊 Timetable Details:`);
    console.log(`   Person: ${highCommander.fullName}`);
    console.log(`   Date: ${timetable.date}`);
    console.log(`   Day Type: ${timetable.dayType}`);
    console.log(`   Time Blocks: ${timetable.timeBlocks.length}`);
    console.log(`   Overall Completion: ${timetable.overallCompletion}%`);
    console.log(`\n📋 Time Blocks:`);

    timetable.timeBlocks.forEach(block => {
      console.log(`   ${block.startTime} - ${block.endTime} | ${block.title} (${block.duration})`);
    });

    console.log(`\n💡 Next Steps:`);
    console.log(`   1. Create frontend UI component for Daily Timetable Card`);
    console.log(`   2. Add API routes for updating time blocks`);
    console.log(`   3. Integrate with Mission Control Dashboard`);
    console.log(`   4. Set up automatic timetable generation for each day\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating timetable:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

seedHighCommanderTimetable();
