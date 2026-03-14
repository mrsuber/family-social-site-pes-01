require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');

// Import all models
const Person = require('./models/Person');
const IncomeStream = require('./models/IncomeStream');
const Expense = require('./models/Expense');
const TimeBlock = require('./models/TimeBlock');
const LearningInvestment = require('./models/LearningInvestment');
const Connection = require('./models/Connection');
const Conversation = require('./models/Conversation');
const Gift = require('./models/Gift');
const DailyLog = require('./models/DailyLog');
const WeeklyPlan = require('./models/WeeklyPlan');

const seedLifeOpsData = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to database\n');

    // Find a high commander to attach the data to
    let person = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (!person) {
      console.log('No high commander found. Creating one...');
      person = await Person.create({
        fullName: 'Cameron Solaire',
        title: 'Founder & High Commander',
        relationshipType: 'high_commander',
        status: 'acquired',
        email: 'cameron@subercraftex.com',
        phone: '+237 XXX XXX XXX'
      });
      console.log(`✅ Created person: ${person.fullName}\n`);
    } else {
      console.log(`✅ Found person: ${person.fullName} (${person.id})\n`);
    }

    const personId = person.id;

    // ==================== INCOME STREAMS ====================
    console.log('📊 Seeding Income Streams...');
    const today = new Date().toISOString().split('T')[0];
    const incomeStreams = [
      {
        personId,
        sourceName: 'Subercraftex Client Projects',
        sourceType: 'subercraftex',
        isVision: true,
        amount: 2500.00,
        frequency: 'monthly',
        receivedDate: today,
        status: 'received',
        notes: 'Main Subercraftex revenue stream'
      },
      {
        personId,
        sourceName: 'Freelance Web Development',
        sourceType: 'freelance',
        isVision: false,
        amount: 800.00,
        frequency: 'monthly',
        receivedDate: today,
        status: 'received',
        notes: 'Survival income - pays the bills'
      },
      {
        personId,
        sourceName: 'Technical Consulting',
        sourceType: 'consulting',
        isVision: false,
        amount: 1200.00,
        frequency: 'monthly',
        receivedDate: today,
        status: 'received',
        notes: 'Part-time consulting work'
      },
      {
        personId,
        sourceName: 'Investment Returns',
        sourceType: 'passive',
        isVision: true,
        amount: 300.00,
        frequency: 'monthly',
        receivedDate: today,
        status: 'received',
        notes: 'Passive income from investments'
      }
    ];

    for (const income of incomeStreams) {
      await IncomeStream.create(income);
      console.log(`  ✓ ${income.sourceName} - $${income.amount}/month (${income.isVision ? 'Vision' : 'Survival'})`);
    }
    console.log('');

    // ==================== EXPENSES ====================
    console.log('💰 Seeding Expenses...');
    const expenses = [
      {
        personId,
        description: 'Rent',
        category: 'housing',
        isInvestment: false,
        amount: 1200.00,
        expenseDate: today,
        isRecurring: true,
        nextDueDate: new Date(new Date().setDate(1)).toISOString().split('T')[0], // 1st of current month
        notes: 'Monthly apartment rent'
      },
      {
        personId,
        description: 'Groceries & Food',
        category: 'food',
        isInvestment: false,
        amount: 400.00,
        expenseDate: today,
        isRecurring: true,
        notes: 'Monthly food budget'
      },
      {
        personId,
        description: 'Online Course: Advanced React',
        category: 'learning',
        isInvestment: true,
        amount: 150.00,
        expenseDate: today,
        isRecurring: false,
        notes: 'Investment in skill development'
      },
      {
        personId,
        description: 'Networking Event Tickets',
        category: 'networking',
        isInvestment: true,
        amount: 75.00,
        expenseDate: today,
        isRecurring: false,
        notes: 'Tech conference networking'
      },
      {
        personId,
        description: 'Internet & Phone',
        category: 'bills',
        isInvestment: false,
        amount: 100.00,
        expenseDate: today,
        isRecurring: true,
        notes: 'Essential utilities'
      },
      {
        personId,
        description: 'AWS Hosting',
        category: 'business',
        isInvestment: true,
        amount: 250.00,
        expenseDate: today,
        isRecurring: true,
        notes: 'Subercraftex infrastructure costs'
      }
    ];

    for (const expense of expenses) {
      await Expense.create(expense);
      console.log(`  ✓ ${expense.description} - $${expense.amount} (${expense.isInvestment ? 'Investment' : 'Expense'})`);
    }
    console.log('');

    // ==================== CONNECTIONS (Personal CRM) ====================
    console.log('🤝 Seeding Connections...');

    const connection1 = await Connection.create({
      personId,
      contactName: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+237 123 456 789',
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      relationshipType: 'client',
      relationshipStrength: 'strong',
      tags: ['tech', 'enterprise', 'potential-client'],
      lastContactDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
      outreachFrequency: 'monthly',
      notes: 'CTO at TechCorp, interested in Subercraftex services'
    });
    console.log(`  ✓ ${connection1.contactName} (${connection1.relationshipType})`);

    // Add conversation for Sarah
    await Conversation.create({
      connectionId: connection1.id,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      medium: 'video',
      topic: 'Project Collaboration Discussion',
      notes: 'Discussed potential project collaboration. Sarah is interested in a custom dashboard solution for her team. Budget range: $5k-$10k. Action items: Send proposal by end of week, Schedule technical demo, Prepare case studies.',
      sentiment: 'very_positive'
    });

    const connection2 = await Connection.create({
      personId,
      contactName: 'Michael Chen',
      email: 'michael@startupxyz.com',
      relationshipType: 'mentor',
      relationshipStrength: 'very_strong',
      tags: ['startup', 'advisor', 'mentor'],
      lastContactDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days ago
      outreachFrequency: 'biweekly',
      notes: 'Successful entrepreneur, provides valuable business advice'
    });
    console.log(`  ✓ ${connection2.contactName} (${connection2.relationshipType})`);

    // Add conversation and gift for Michael
    await Conversation.create({
      connectionId: connection2.id,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      medium: 'in_person',
      topic: 'Business Strategy & Funding',
      notes: 'Coffee meeting. Discussed scaling strategies and funding options for Subercraftex. Michael suggested focusing on recurring revenue models. Action items: Research SaaS pricing models, Create financial projections.',
      sentiment: 'positive'
    });

    await Gift.create({
      connectionId: connection2.id,
      giftDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Business Strategy Book: Zero to One by Peter Thiel (Thank you for mentorship)',
      cost: 25.00,
      reaction: 'Very appreciative, mentioned he\'ll read it during his upcoming trip'
    });

    const connection3 = await Connection.create({
      personId,
      contactName: 'Lisa Rodriguez',
      email: 'lisa.r@designstudio.com',
      relationshipType: 'partner',
      relationshipStrength: 'moderate',
      tags: ['design', 'collaboration', 'creative'],
      lastContactDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      outreachFrequency: 'weekly',
      notes: 'UI/UX designer, potential collaboration partner'
    });
    console.log(`  ✓ ${connection3.contactName} (${connection3.relationshipType})`);

    console.log('');

    // ==================== DAILY LOGS ====================
    console.log('📅 Seeding Daily Logs...');

    const dailyLogs = [
      {
        personId,
        date: new Date().toISOString().split('T')[0], // Today
        totalIncome: 250.00,
        totalExpenses: 75.00,
        hoursSubercraftex: 6.5,
        hoursSurvival: 2.0,
        mood: 'good',
        wins: ['Completed client proposal', 'Fixed critical bug', 'Had productive meeting with Sarah'],
        challenges: ['Struggled with deployment issues', 'Time management between projects'],
        notes: 'Overall productive day. Need to balance vision work with survival income better.'
      },
      {
        personId,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
        totalIncome: 0,
        totalExpenses: 120.00,
        hoursSubercraftex: 8.0,
        hoursSurvival: 0,
        mood: 'excellent',
        wins: ['Shipped new feature', 'Received positive client feedback', 'Completed 8 hours on vision work'],
        challenges: [],
        notes: 'Amazing day! Fully focused on Subercraftex.'
      },
      {
        personId,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
        totalIncome: 800.00,
        totalExpenses: 200.00,
        hoursSubercraftex: 3.0,
        hoursSurvival: 5.0,
        mood: 'stressed',
        wins: ['Got paid for freelance work'],
        challenges: ['Too much survival work', 'Little time for vision projects', 'Feeling burned out'],
        notes: 'Need to reduce survival work and focus more on Subercraftex.'
      }
    ];

    for (const log of dailyLogs) {
      await DailyLog.create(log);
      const daysAgo = Math.round((new Date() - new Date(log.date)) / (1000 * 60 * 60 * 24));
      console.log(`  ✓ ${log.date} (${daysAgo === 0 ? 'Today' : daysAgo + ' days ago'}) - Mood: ${log.mood}, ${log.hoursSubercraftex}h vision work`);
    }
    console.log('');

    // ==================== WEEKLY PLANS ====================
    console.log('📋 Seeding Weekly Plans...');

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

    const currentWeekPlan = await WeeklyPlan.create({
      personId,
      weekStartDate: weekStart.toISOString().split('T')[0],
      weekEndDate: weekEnd.toISOString().split('T')[0],
      weekGoal: 'Close 2 new clients and ship MVP update for Subercraftex',
      mustDoSurvival: [
        { task: 'Complete freelance project deliverables', completed: true },
        { task: 'Pay rent and utilities', completed: true },
        { task: 'Submit consulting invoices', completed: false }
      ],
      shouldDoGrowth: [
        { task: 'Finish React course module 3', completed: false },
        { task: 'Network with 3 new contacts', completed: true },
        { task: 'Update portfolio website', completed: false },
        { task: 'Write technical blog post', completed: false }
      ],
      wantDoVision: [
        { task: 'Design new Subercraftex feature roadmap', completed: true },
        { task: 'Build prototype for dashboard analytics', completed: false },
        { task: 'Create pitch deck for investors', completed: false },
        { task: 'Schedule meetings with potential clients', completed: true }
      ]
    });
    console.log(`  ✓ Current Week (${currentWeekPlan.weekStartDate} to ${currentWeekPlan.weekEndDate})`);

    // Previous week
    const prevWeekStart = new Date(weekStart);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    const prevWeekEnd = new Date(prevWeekStart);
    prevWeekEnd.setDate(prevWeekStart.getDate() + 6);

    const lastWeekPlan = await WeeklyPlan.create({
      personId,
      weekStartDate: prevWeekStart.toISOString().split('T')[0],
      weekEndDate: prevWeekEnd.toISOString().split('T')[0],
      weekGoal: 'Launch marketing campaign and secure 1 new client',
      mustDoSurvival: [
        { task: 'Complete all freelance deadlines', completed: true },
        { task: 'Invoice clients for consulting hours', completed: true },
        { task: 'Grocery shopping and meal prep', completed: true }
      ],
      shouldDoGrowth: [
        { task: 'Attend tech networking event', completed: true },
        { task: 'Complete React course module 2', completed: true },
        { task: 'Update LinkedIn profile', completed: false }
      ],
      wantDoVision: [
        { task: 'Launch Subercraftex marketing site', completed: true },
        { task: 'Onboard first beta user', completed: true },
        { task: 'Create content calendar', completed: false }
      ]
    });
    console.log(`  ✓ Last Week (${lastWeekPlan.weekStartDate} to ${lastWeekPlan.weekEndDate})`);

    console.log('');
    console.log('==========================================');
    console.log('✅ Life Operations Data Seeded Successfully!');
    console.log('==========================================');
    console.log('');
    console.log(`Person: ${person.fullName} (ID: ${person.id})`);
    console.log(`Income Streams: ${incomeStreams.length}`);
    console.log(`Expenses: ${expenses.length}`);
    console.log(`Connections: 3`);
    console.log(`Conversations: 3`);
    console.log(`Gifts: 1`);
    console.log(`Daily Logs: ${dailyLogs.length}`);
    console.log(`Weekly Plans: 2`);
    console.log('');
    console.log('You can now view all this data in Mission Control!');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Life Operations data:', error);
    process.exit(1);
  }
};

seedLifeOpsData();
