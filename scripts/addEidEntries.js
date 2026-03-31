require('dotenv').config();
const { sequelize } = require('../config/db');
const DailyLog = require('../models/DailyLog');
const CommanderDiary = require('../models/CommanderDiary');
const CommanderCalendar = require('../models/CommanderCalendar');

const PERSON_ID = 'bd443b67-9479-4ebc-8651-05658eddd9f2'; // Mohamad Siysinyuy

async function addEidEntries() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // ==================== TODAY: March 18, 2026 ====================
    console.log('📅 Creating entries for TODAY (March 18, 2026 - Eid in Bafousam)...\n');

    // Daily Log for Today
    console.log('📊 Creating Daily Log for today...');
    const todayLog = await DailyLog.create({
      personId: PERSON_ID,
      date: '2026-03-18',
      totalIncome: 0,
      totalExpenses: 50000, // Total XAF expenses
      hoursSubercraftex: 0,
      hoursSurvival: 0,
      mood: 'good',
      wins: [
        'Celebrated Eid al-Fitr in Bafousam',
        'Successfully purchased items for friend (sweet potatoes and black beans)',
        'Organized finances for trip back to Buea'
      ],
      challenges: [
        'Managing multiple financial transactions (friend\'s money, personal expenses, zakat, transport)',
        'Coordinating purchases and payments during Eid holiday'
      ],
      notes: `Location: Bafousam, Cameroon

Eid al-Fitr Celebrations - End of Ramadan

Financial Breakdown (Total: 50,000 XAF):
• Friend's purchases: 10,000 XAF
  - Sweet potatoes (2 buckets) + Black beans (1 bucket) = 11,500 XAF spent
  - Friend owes me: 1,500 XAF (to collect in Buea)

• Personal food for travel: 20,000 XAF
• Zakat al-Fitr (for myself and wife): 10,000 XAF
• Transport to Buea: 10,000 XAF

Task: Withdraw 50,000 XAF after Eid prayer and purchase food for travel back to Buea.`
    });
    console.log('  ✓ Daily Log created\n');

    // Diary Entry for Today
    console.log('📖 Creating Diary Entry for today...');
    const todayDiary = await CommanderDiary.create({
      personId: PERSON_ID,
      entryDate: '2026-03-18',
      textContent: `Eid Mubarak! Today marks the end of Ramadan and the celebration of Eid al-Fitr here in Bafousam, Cameroon.

After the Eid prayer, I have several important tasks to complete:

1. Withdraw 50,000 XAF for various expenses
2. Purchase food for the journey back to Buea
3. Pay Zakat al-Fitr for myself and my wife (10,000 XAF)

I also helped a friend in Buea by purchasing some items he needed:
- 2 buckets of sweet potatoes
- 1 bucket of black beans
Total cost: 11,500 XAF (he sent 10,000 XAF, so he owes me 1,500 XAF)

The plan is to travel back to Buea after completing these tasks. It's been a blessed Ramadan, and I'm grateful for the opportunity to celebrate Eid in Bafousam and help others while managing the logistics of the return journey.

May Allah accept our fasts and good deeds. Eid Mubarak to all!`,
      mood: 'good',
      tags: ['Eid', 'Bafousam', 'Travel', 'Ramadan', 'Zakat', 'Family']
    });
    console.log('  ✓ Diary Entry created\n');

    // Calendar Events for Today
    console.log('📅 Creating Calendar Events for today...');

    const eidPrayer = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'Eid al-Fitr Prayer',
      description: 'Eid prayer marking the end of Ramadan. Followed by celebrations and greetings.',
      eventType: 'appointment',
      startDate: '2026-03-18',
      endDate: '2026-03-18',
      allDay: false,
      priority: 'critical',
      status: 'pending'
    });

    const withdrawMoney = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'Withdraw 50,000 XAF',
      description: 'Withdraw money for: Friend\'s items (10k), Personal food (20k), Zakat (10k), Transport (10k)',
      eventType: 'task',
      startDate: '2026-03-18',
      endDate: '2026-03-18',
      allDay: false,
      priority: 'high',
      status: 'pending'
    });

    const buyFood = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'Purchase Food for Travel',
      description: 'Buy food to take back to Buea (Maximum 20,000 XAF)',
      eventType: 'task',
      startDate: '2026-03-18',
      endDate: '2026-03-18',
      allDay: false,
      priority: 'high',
      status: 'pending'
    });

    const payZakat = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'Pay Zakat al-Fitr',
      description: 'Pay Zakat for myself and my wife (10,000 XAF). Must be paid before Eid prayer or latest tomorrow.',
      eventType: 'task',
      startDate: '2026-03-18',
      endDate: '2026-03-19',
      allDay: false,
      priority: 'critical',
      status: 'pending'
    });

    const travelBuea = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'Travel to Buea',
      description: 'Return journey from Bafousam to Buea (10,000 XAF transport cost)',
      eventType: 'appointment',
      startDate: '2026-03-18',
      endDate: '2026-03-18',
      allDay: false,
      priority: 'high',
      status: 'pending'
    });

    console.log('  ✓ 5 Calendar Events created for today\n');

    // ==================== TOMORROW: March 19, 2026 ====================
    console.log('📅 Creating entries for TOMORROW (March 19, 2026)...\n');

    // Daily Log for Tomorrow
    console.log('📊 Creating Daily Log for tomorrow...');
    const tomorrowLog = await DailyLog.create({
      personId: PERSON_ID,
      date: '2026-03-19',
      totalIncome: 0,
      totalExpenses: 19500, // Embroidery machine motor repair
      hoursSubercraftex: 0,
      hoursSurvival: 0,
      mood: 'neutral',
      wins: [],
      challenges: [
        'Need to collect embroidery machine motor from repair',
        'Ensure Zakat payment is completed if not done yesterday'
      ],
      notes: `Tasks for today:
1. Collect embroidery machine motor from repair shop (Paid: 19,500 XAF)
2. Pay Zakat al-Fitr if not completed yesterday (DEADLINE: Today)

The embroidery machine motor was faulty, so I brought it to Bafousam for repair. The repair cost 19,500 XAF.

Important: Zakat al-Fitr must be paid no later than today!`
    });
    console.log('  ✓ Daily Log created\n');

    // Diary Entry for Tomorrow
    console.log('📖 Creating Diary Entry for tomorrow...');
    const tomorrowDiary = await CommanderDiary.create({
      personId: PERSON_ID,
      entryDate: '2026-03-19',
      textContent: `Day after Eid - Important tasks to complete:

**Primary Task: Collect Embroidery Machine Motor**
The motor of my embroidery machine was faulty, and I brought it to Bafousam for repair. The repair has cost me 19,500 XAF. I need to collect it today.

**Critical Reminder: Zakat Payment**
If I didn't manage to pay the Zakat al-Fitr yesterday (10,000 XAF for myself and my wife), I MUST pay it today. This is the absolute deadline. Zakat al-Fitr must be paid before the Eid prayer or immediately after, but no later than the end of the day of Eid.

**Financial Summary:**
- Embroidery machine motor repair: 19,500 XAF (already paid)
- Zakat al-Fitr: 10,000 XAF (if not paid yesterday)

Once these tasks are complete, I can focus on getting back into regular work routine after the Eid celebrations.`,
      mood: 'neutral',
      tags: ['Bafousam', 'Embroidery', 'Machine Repair', 'Zakat', 'Eid', 'Business']
    });
    console.log('  ✓ Diary Entry created\n');

    // Calendar Events for Tomorrow
    console.log('📅 Creating Calendar Events for tomorrow...');

    const collectMotor = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'Collect Embroidery Machine Motor',
      description: 'Pick up the repaired embroidery machine motor from the repair shop in Bafousam. Cost: 19,500 XAF (already paid)',
      eventType: 'task',
      startDate: '2026-03-19',
      endDate: '2026-03-19',
      allDay: false,
      priority: 'high',
      status: 'pending'
    });

    const zakatDeadline = await CommanderCalendar.create({
      personId: PERSON_ID,
      title: 'DEADLINE: Pay Zakat al-Fitr',
      description: 'FINAL DEADLINE to pay Zakat al-Fitr (10,000 XAF) if not completed yesterday. This is mandatory before end of Eid day.',
      eventType: 'deadline',
      startDate: '2026-03-19',
      endDate: '2026-03-19',
      allDay: false,
      priority: 'critical',
      status: 'pending'
    });

    console.log('  ✓ 2 Calendar Events created for tomorrow\n');

    // Summary
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('✨ ALL ENTRIES CREATED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('📊 SUMMARY:');
    console.log('');
    console.log('TODAY (March 18, 2026 - Eid in Bafousam):');
    console.log('  • 1 Daily Log (50,000 XAF expenses)');
    console.log('  • 1 Diary Entry (Eid celebrations)');
    console.log('  • 5 Calendar Events (Eid prayer, withdraw, food, zakat, travel)');
    console.log('');
    console.log('TOMORROW (March 19, 2026):');
    console.log('  • 1 Daily Log (19,500 XAF expense)');
    console.log('  • 1 Diary Entry (machine collection & zakat reminder)');
    console.log('  • 2 Calendar Events (collect motor, zakat deadline)');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('1. Refresh your browser at https://agent.subercraftex.com');
    console.log('2. Go to Daily Ops tab to see your daily logs');
    console.log('3. Go to Diary tab to read your diary entries');
    console.log('4. Go to Calendar tab to see all your events');
    console.log('');
    console.log('🎉 Eid Mubarak! May Allah accept your fasts and good deeds!');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating entries:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

addEidEntries();
