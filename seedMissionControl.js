require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const General = require('./models/General');
const Person = require('./models/Person');
const Department = require('./models/Department');
const Project = require('./models/Project');
const PhysicalAsset = require('./models/PhysicalAsset');
const CommanderCalendar = require('./models/CommanderCalendar');
const CommanderDiary = require('./models/CommanderDiary');

const seedMissionControl = async () => {
  try {
    await connectDB();
    console.log('🚀 Starting Mission Control database seeding...\n');

    // Get Mohammad (High Commander)
    const mohammad = await Person.findOne({ where: { fullName: 'Mohamad Siysinyuy' } });
    if (!mohammad) {
      console.error('❌ High Commander not found! Please ensure Mohamad Siysinyuy exists.');
      process.exit(1);
    }
    console.log('✅ Found High Commander:', mohammad.fullName);

    // ===========================================
    // STEP 1: CREATE/UPDATE GENERALS
    // ===========================================
    console.log('\n📊 Creating Strategic Generals...');

    const generalsData = [
      {
        name: 'Technology & Innovation Division',
        description: 'Oversees all software development, IT infrastructure, and technological advancement initiatives',
        commanderId: mohammad.id,
        status: 'active',
        orderNumber: 1,
        objectives: [
          'Lead digital transformation initiatives',
          'Develop cutting-edge software solutions',
          'Maintain robust IT infrastructure',
          'Drive innovation in AI and automation',
          'Achieve 99.9% system uptime'
        ]
      },
      {
        name: 'Business Development & Strategy',
        description: 'Focuses on market expansion, strategic partnerships, and revenue growth',
        commanderId: mohammad.id,
        status: 'active',
        orderNumber: 2,
        objectives: [
          'Expand into new markets',
          'Build strategic partnerships',
          'Increase revenue by 40% YoY',
          'Develop long-term business strategy',
          'Achieve high customer satisfaction'
        ]
      },
      {
        name: 'Operations & Efficiency',
        description: 'Manages day-to-day operations, process optimization, and resource allocation',
        commanderId: mohammad.id,
        status: 'active',
        orderNumber: 3,
        objectives: [
          'Optimize operational processes',
          'Reduce costs by 15%',
          'Improve team productivity',
          'Streamline resource allocation',
          'Achieve operational excellence'
        ]
      },
      {
        name: 'People & Culture',
        description: 'Handles talent acquisition, employee development, and organizational culture',
        commanderId: mohammad.id,
        status: 'active',
        orderNumber: 4,
        objectives: [
          'Attract top talent globally',
          'Develop leadership pipeline',
          'Foster inclusive culture',
          'Achieve 90% employee satisfaction',
          'Build high-performing teams'
        ]
      }
    ];

    const generals = [];
    for (const genData of generalsData) {
      const [general] = await General.findOrCreate({
        where: { name: genData.name },
        defaults: genData
      });
      generals.push(general);
      console.log(`  ✓ ${general.name}`);
    }

    // ===========================================
    // STEP 2: CREATE DEPARTMENTS
    // ===========================================
    console.log('\n🏢 Creating Departments...');

    const departmentsData = [
      // Technology & Innovation Division
      { generalId: generals[0].id, name: 'Frontend Development', description: 'React, Vue, Angular development teams', status: 'active', objectives: ['Build responsive UIs', 'Optimize performance'] },
      { generalId: generals[0].id, name: 'Backend Development', description: 'Node.js, Python, Java backend services', status: 'active', objectives: ['Build scalable APIs', 'Ensure security'] },
      { generalId: generals[0].id, name: 'DevOps & Infrastructure', description: 'CI/CD, cloud infrastructure, monitoring', status: 'active', objectives: ['Automate deployments', '99.9% uptime'] },
      { generalId: generals[0].id, name: 'Data Science & AI', description: 'Machine learning, analytics, AI research', status: 'active', objectives: ['Develop AI models', 'Data-driven insights'] },

      // Business Development & Strategy
      { generalId: generals[1].id, name: 'Sales & Marketing', description: 'Customer acquisition and brand management', status: 'active', objectives: ['Increase market share', 'Build brand awareness'] },
      { generalId: generals[1].id, name: 'Strategic Partnerships', description: 'Alliance building and partnership management', status: 'active', objectives: ['Form key partnerships', 'Negotiate deals'] },
      { generalId: generals[1].id, name: 'Market Research', description: 'Competitive analysis and market intelligence', status: 'active', objectives: ['Identify opportunities', 'Analyze trends'] },

      // Operations & Efficiency
      { generalId: generals[2].id, name: 'Project Management', description: 'Agile project delivery and coordination', status: 'active', objectives: ['On-time delivery', 'Resource optimization'] },
      { generalId: generals[2].id, name: 'Quality Assurance', description: 'Testing, QA automation, quality standards', status: 'active', objectives: ['Zero defects', 'Automated testing'] },
      { generalId: generals[2].id, name: 'Finance & Accounting', description: 'Financial planning, budgeting, reporting', status: 'active', objectives: ['Budget adherence', 'Financial health'] },

      // People & Culture
      { generalId: generals[3].id, name: 'Talent Acquisition', description: 'Recruitment and onboarding', status: 'active', objectives: ['Hire top talent', 'Reduce time-to-hire'] },
      { generalId: generals[3].id, name: 'Learning & Development', description: 'Training programs and skill development', status: 'active', objectives: ['Upskill workforce', 'Leadership development'] },
      { generalId: generals[3].id, name: 'Employee Experience', description: 'Culture, engagement, and well-being', status: 'active', objectives: ['High engagement', 'Great workplace'] }
    ];

    const departments = [];
    for (const deptData of departmentsData) {
      const dept = await Department.create(deptData);
      departments.push(dept);
      console.log(`  ✓ ${dept.name}`);
    }

    // ===========================================
    // STEP 3: CREATE PEOPLE & ASSIGN TO DEPARTMENTS
    // ===========================================
    console.log('\n👥 Creating People...');

    const peopleData = [
      // Frontend Development
      { fullName: 'Sarah Chen', title: 'Senior Frontend Engineer', email: 'sarah.chen@company.com', phone: '+1-555-0101', relationshipType: 'employee', status: 'active', departmentId: departments[0].id, skills: [{ name: 'React', level: 'Expert' }, { name: 'TypeScript', level: 'Advanced' }], languages: ['English', 'Mandarin'], yearsOfExperience: 6 },
      { fullName: 'Alex Rodriguez', title: 'UI/UX Designer', email: 'alex.r@company.com', phone: '+1-555-0102', relationshipType: 'employee', status: 'active', departmentId: departments[0].id, skills: [{ name: 'Figma', level: 'Expert' }, { name: 'CSS', level: 'Advanced' }], languages: ['English', 'Spanish'], yearsOfExperience: 4 },

      // Backend Development
      { fullName: 'James Wilson', title: 'Backend Architect', email: 'james.w@company.com', phone: '+1-555-0103', relationshipType: 'employee', status: 'active', departmentId: departments[1].id, skills: [{ name: 'Node.js', level: 'Expert' }, { name: 'PostgreSQL', level: 'Expert' }], languages: ['English'], yearsOfExperience: 8 },
      { fullName: 'Priya Patel', title: 'API Developer', email: 'priya.p@company.com', phone: '+1-555-0104', relationshipType: 'employee', status: 'active', departmentId: departments[1].id, skills: [{ name: 'Python', level: 'Advanced' }, { name: 'FastAPI', level: 'Advanced' }], languages: ['English', 'Hindi', 'Gujarati'], yearsOfExperience: 5 },

      // DevOps & Infrastructure
      { fullName: 'Marcus Johnson', title: 'DevOps Lead', email: 'marcus.j@company.com', phone: '+1-555-0105', relationshipType: 'employee', status: 'active', departmentId: departments[2].id, skills: [{ name: 'Kubernetes', level: 'Expert' }, { name: 'AWS', level: 'Expert' }], languages: ['English'], yearsOfExperience: 7 },
      { fullName: 'Elena Volkov', title: 'Cloud Engineer', email: 'elena.v@company.com', phone: '+1-555-0106', relationshipType: 'employee', status: 'active', departmentId: departments[2].id, skills: [{ name: 'Docker', level: 'Advanced' }, { name: 'Terraform', level: 'Advanced' }], languages: ['English', 'Russian'], yearsOfExperience: 4 },

      // Data Science & AI
      { fullName: 'Dr. Aisha Mohammed', title: 'ML Research Scientist', email: 'aisha.m@company.com', phone: '+1-555-0107', relationshipType: 'employee', status: 'active', departmentId: departments[3].id, skills: [{ name: 'TensorFlow', level: 'Expert' }, { name: 'Python', level: 'Expert' }], languages: ['English', 'Arabic'], yearsOfExperience: 9, education: [{ institution: 'MIT', degree: 'PhD Computer Science', year: 2018 }] },

      // Sales & Marketing
      { fullName: 'Jennifer Taylor', title: 'Head of Sales', email: 'jennifer.t@company.com', phone: '+1-555-0108', relationshipType: 'employee', status: 'active', departmentId: departments[4].id, skills: [{ name: 'B2B Sales', level: 'Expert' }, { name: 'Negotiation', level: 'Expert' }], languages: ['English'], yearsOfExperience: 10 },
      { fullName: 'David Kim', title: 'Marketing Manager', email: 'david.k@company.com', phone: '+1-555-0109', relationshipType: 'employee', status: 'active', departmentId: departments[4].id, skills: [{ name: 'Digital Marketing', level: 'Advanced' }, { name: 'SEO', level: 'Advanced' }], languages: ['English', 'Korean'], yearsOfExperience: 6 },

      // Strategic Partnerships
      { fullName: 'Olivia Martinez', title: 'Partnerships Director', email: 'olivia.m@company.com', phone: '+1-555-0110', relationshipType: 'employee', status: 'active', departmentId: departments[5].id, skills: [{ name: 'Strategic Planning', level: 'Expert' }, { name: 'Contract Negotiation', level: 'Advanced' }], languages: ['English', 'Spanish', 'French'], yearsOfExperience: 8 },

      // Market Research
      { fullName: 'Thomas Anderson', title: 'Market Analyst', email: 'thomas.a@company.com', phone: '+1-555-0111', relationshipType: 'employee', status: 'active', departmentId: departments[6].id, skills: [{ name: 'Data Analysis', level: 'Advanced' }, { name: 'Market Research', level: 'Advanced' }], languages: ['English'], yearsOfExperience: 5 },

      // Project Management
      { fullName: 'Rachel Green', title: 'Senior PM', email: 'rachel.g@company.com', phone: '+1-555-0112', relationshipType: 'employee', status: 'active', departmentId: departments[7].id, skills: [{ name: 'Agile/Scrum', level: 'Expert' }, { name: 'JIRA', level: 'Advanced' }], languages: ['English'], yearsOfExperience: 7 },
      { fullName: 'Carlos Santos', title: 'Project Coordinator', email: 'carlos.s@company.com', phone: '+1-555-0113', relationshipType: 'employee', status: 'active', departmentId: departments[7].id, skills: [{ name: 'Project Planning', level: 'Advanced' }], languages: ['English', 'Portuguese', 'Spanish'], yearsOfExperience: 3 },

      // Quality Assurance
      { fullName: 'Lisa Wong', title: 'QA Lead', email: 'lisa.w@company.com', phone: '+1-555-0114', relationshipType: 'employee', status: 'active', departmentId: departments[8].id, skills: [{ name: 'Test Automation', level: 'Expert' }, { name: 'Selenium', level: 'Advanced' }], languages: ['English', 'Cantonese'], yearsOfExperience: 6 },

      // Finance & Accounting
      { fullName: 'Michael Brown', title: 'Finance Director', email: 'michael.b@company.com', phone: '+1-555-0115', relationshipType: 'employee', status: 'active', departmentId: departments[9].id, skills: [{ name: 'Financial Planning', level: 'Expert' }, { name: 'Excel', level: 'Expert' }], languages: ['English'], yearsOfExperience: 12 },

      // Talent Acquisition
      { fullName: 'Emma Thompson', title: 'Talent Acquisition Manager', email: 'emma.t@company.com', phone: '+1-555-0116', relationshipType: 'employee', status: 'active', departmentId: departments[10].id, skills: [{ name: 'Recruiting', level: 'Expert' }, { name: 'Interviewing', level: 'Expert' }], languages: ['English'], yearsOfExperience: 8 },

      // Learning & Development
      { fullName: 'Nathan Hughes', title: 'L&D Specialist', email: 'nathan.h@company.com', phone: '+1-555-0117', relationshipType: 'employee', status: 'active', departmentId: departments[11].id, skills: [{ name: 'Training Design', level: 'Advanced' }, { name: 'Coaching', level: 'Advanced' }], languages: ['English'], yearsOfExperience: 5 },

      // Employee Experience
      { fullName: 'Sophie Zhang', title: 'Culture & Engagement Lead', email: 'sophie.z@company.com', phone: '+1-555-0118', relationshipType: 'employee', status: 'active', departmentId: departments[12].id, skills: [{ name: 'Employee Engagement', level: 'Expert' }, { name: 'Event Planning', level: 'Advanced' }], languages: ['English', 'Mandarin'], yearsOfExperience: 6 }
    ];

    const people = [];
    for (const personData of peopleData) {
      const person = await Person.create(personData);
      people.push(person);
      console.log(`  ✓ ${person.fullName} - ${person.title}`);
    }

    // ===========================================
    // STEP 4: ADD PROJECTS
    // ===========================================
    console.log('\n📁 Creating Projects...');

    const projectsData = [
      { name: 'Mobile App Redesign', description: 'Complete redesign of mobile application with new UX', generalId: generals[0].id, status: 'in-progress', priority: 'high', startDate: '2026-01-15', targetDate: '2026-06-30', budget: 250000, progress: 45 },
      { name: 'AI Chatbot Integration', description: 'Integrate AI-powered chatbot for customer support', generalId: generals[0].id, status: 'in-progress', priority: 'high', startDate: '2026-02-01', targetDate: '2026-05-15', budget: 180000, progress: 30 },
      { name: 'European Market Expansion', description: 'Expand operations into Germany, France, and Spain', generalId: generals[1].id, status: 'in-progress', priority: 'critical', startDate: '2026-01-01', targetDate: '2026-12-31', budget: 500000, progress: 25 },
      { name: 'Process Automation Initiative', description: 'Automate manual processes to improve efficiency', generalId: generals[2].id, status: 'in-progress', priority: 'medium', startDate: '2026-02-15', targetDate: '2026-08-30', budget: 150000, progress: 60 },
      { name: 'Leadership Development Program', description: 'Comprehensive leadership training for managers', generalId: generals[3].id, status: 'in-progress', priority: 'medium', startDate: '2026-01-10', targetDate: '2026-12-31', budget: 120000, progress: 40 }
    ];

    const projects = [];
    for (const projData of projectsData) {
      const project = await Project.create(projData);
      projects.push(project);
      console.log(`  ✓ ${project.name}`);
    }

    // ===========================================
    // STEP 5: CALENDAR ENTRIES FOR COMMANDER
    // ===========================================
    console.log('\n📅 Creating Calendar Entries for High Commander...');

    const calendarEntries = [
      { personId: mohammad.id, title: 'Q1 Strategic Planning Session', eventType: 'meeting', startDate: '2026-03-15T09:00:00', endDate: '2026-03-15T12:00:00', priority: 'critical', status: 'pending', description: 'Quarterly strategic planning with all generals' },
      { personId: mohammad.id, title: 'Board Meeting Preparation', eventType: 'task', startDate: '2026-03-18T14:00:00', priority: 'high', status: 'in-progress', description: 'Prepare presentation for board meeting' },
      { personId: mohammad.id, title: 'Technology Review', eventType: 'meeting', startDate: '2026-03-20T10:00:00', endDate: '2026-03-20T11:30:00', priority: 'high', status: 'pending', description: 'Review tech stack modernization progress' },
      { personId: mohammad.id, title: 'One-on-One with Jennifer (Sales Head)', eventType: 'appointment', startDate: '2026-03-22T15:00:00', endDate: '2026-03-22T16:00:00', priority: 'medium', status: 'pending', description: 'Discuss Q1 sales performance' },
      { personId: mohammad.id, title: 'Submit Q1 Report', eventType: 'deadline', startDate: '2026-03-31T17:00:00', priority: 'critical', status: 'pending', description: 'Final deadline for Q1 report submission' },
      { personId: mohammad.id, title: 'Team Building Event', eventType: 'reminder', startDate: '2026-04-05T13:00:00', priority: 'low', status: 'pending', description: 'Company-wide team building activities' },
      { personId: mohammad.id, title: 'Budget Review Meeting', eventType: 'meeting', startDate: '2026-03-25T09:00:00', endDate: '2026-03-25T10:30:00', priority: 'high', status: 'pending', description: 'Review departmental budgets with finance' },
      { personId: mohammad.id, title: 'Code Review Session', eventType: 'task', startDate: '2026-03-17T16:00:00', priority: 'medium', status: 'completed', description: 'Review critical pull requests' },
      { personId: mohammad.id, title: 'Investor Call', eventType: 'appointment', startDate: '2026-03-28T11:00:00', endDate: '2026-03-28T12:00:00', priority: 'critical', status: 'pending', description: 'Quarterly update call with investors' },
      { personId: mohammad.id, title: 'Employee Town Hall', eventType: 'meeting', startDate: '2026-04-10T14:00:00', endDate: '2026-04-10T15:30:00', priority: 'high', status: 'pending', description: 'All-hands meeting to discuss company direction' }
    ];

    for (const entry of calendarEntries) {
      await CommanderCalendar.create(entry);
    }
    console.log(`  ✓ Created ${calendarEntries.length} calendar entries`);

    // ===========================================
    // STEP 6: DIARY ENTRIES FOR COMMANDER
    // ===========================================
    console.log('\n📖 Creating Diary Entries for High Commander...');

    const diaryEntries = [
      { personId: mohammad.id, entryDate: '2026-03-10', mood: 'excellent', textContent: 'Incredible day! We closed the deal with our biggest client yet. The team worked tirelessly, and it paid off. Revenue projections for Q2 are looking fantastic. I am so proud of everyone involved, especially the sales and engineering teams who collaborated seamlessly.', tags: ['business', 'achievement', 'team-success'] },
      { personId: mohammad.id, entryDate: '2026-03-11', mood: 'good', textContent: 'Productive meetings with department heads today. The Technology Division is making excellent progress on the mobile app redesign. Sarah and her frontend team demonstrated impressive new UI components. Backend team is on track with API development. Feeling optimistic about our March deliverables.', tags: ['meetings', 'technology', 'progress'] },
      { personId: mohammad.id, entryDate: '2026-03-12', mood: 'neutral', textContent: 'Regular day filled with administrative tasks. Reviewed budgets, approved a few proposals, and caught up on emails. Sometimes these operational days are necessary, even if they are not the most exciting. Important to maintain steady leadership and keep all the gears turning smoothly.', tags: ['administration', 'routine', 'operations'] },
      { personId: mohammad.id, entryDate: '2026-03-13', mood: 'stressed', textContent: 'Challenging day dealing with a production incident. Our main service went down for 2 hours affecting thousands of users. Marcus and the DevOps team worked around the clock to restore service. We need to conduct a thorough post-mortem and implement better monitoring. This is a wake-up call for infrastructure improvements.', tags: ['crisis', 'production-incident', 'infrastructure'] },
      { personId: mohammad.id, entryDate: '2026-03-14', mood: 'good', textContent: 'Great session with Dr. Aisha and the AI team. They presented fascinating research on our new machine learning models. The potential applications are enormous. Also had lunch with the People & Culture team - Emma shared exciting recruitment pipeline updates. We are attracting top talent from leading tech companies.', tags: ['innovation', 'ai', 'recruitment'] },
      { personId: mohammad.id, entryDate: '2026-03-15', mood: 'excellent', textContent: 'Strategic planning session went exceptionally well. All four generals presented their quarterly objectives and KPIs. The alignment across divisions is stronger than ever. We identified three major opportunities for growth and two areas requiring immediate attention. This is what great leadership looks like - collaborative, data-driven, forward-thinking.', tags: ['strategy', 'leadership', 'planning'] },
      { personId: mohammad.id, entryDate: '2026-03-16', mood: 'neutral', textContent: 'Spent most of the day in back-to-back one-on-ones with team members. While individually productive, I am feeling a bit drained. Need to block out more strategic thinking time on my calendar. Sometimes the urgent crowds out the important. Tomorrow I will dedicate morning hours to deep work only.', tags: ['meetings', 'time-management', 'reflection'] },
      { personId: mohammad.id, entryDate: '2026-03-17', mood: 'good', textContent: 'Code review session was enlightening. Even though I am in a leadership role, I love staying connected to the technical work. James walked me through the new microservices architecture. The engineering quality is top-notch. Also finalized our European expansion strategy with Olivia - targeting launch in Berlin by Q3.', tags: ['technical', 'engineering', 'expansion'] },
      { personId: mohammad.id, entryDate: '2026-03-18', mood: 'stressed', textContent: 'Budget discussions are always tough. Had to make some difficult decisions about resource allocation. Not everyone will be happy with the outcome, but we need to prioritize initiatives with highest ROI. Michael did excellent work presenting financial scenarios. Sometimes leadership means making unpopular but necessary decisions.', tags: ['finance', 'difficult-decisions', 'budget'] },
      { personId: mohammad.id, entryDate: '2026-03-19', mood: 'excellent', textContent: 'Phenomenal news! We just got approved for Series C funding. This is transformational for the company. We can now accelerate hiring, expand into new markets, and invest heavily in R&D. Celebrated with the executive team over dinner. The future is incredibly bright. All our hard work is paying off.', tags: ['funding', 'milestone', 'celebration', 'growth'] }
    ];

    for (const entry of diaryEntries) {
      await CommanderDiary.create(entry);
    }
    console.log(`  ✓ Created ${diaryEntries.length} diary entries`);

    // ===========================================
    // STEP 7: ADD ASSETS
    // ===========================================
    console.log('\n💼 Creating Assets...');

    const assetsData = [
      { name: 'MacBook Pro 16" M3', category: 'equipment', serialNumber: 'MBP-2024-001', purchaseDate: '2024-01-15', purchasePrice: 3499, currentValue: 2800, condition: 'excellent', assignedTo: people[0].id, status: 'in-use' },
      { name: 'MacBook Pro 14" M2', category: 'equipment', serialNumber: 'MBP-2023-087', purchaseDate: '2023-06-20', purchasePrice: 2499, currentValue: 1800, condition: 'good', assignedTo: people[1].id, status: 'in-use' },
      { name: 'Dell XPS 15 Developer Edition', category: 'equipment', serialNumber: 'DXPS-2024-023', purchaseDate: '2024-02-10', purchasePrice: 2299, currentValue: 1900, condition: 'excellent', assignedTo: people[2].id, status: 'in-use' },
      { name: 'AWS Cloud Infrastructure', category: 'software', serialNumber: 'AWS-ENT-2024', purchaseDate: '2024-01-01', purchasePrice: 120000, currentValue: 120000, condition: 'excellent', status: 'active', maintenanceSchedule: 'continuous' },
      { name: 'GitHub Enterprise License', category: 'license', serialNumber: 'GH-ENT-500', purchaseDate: '2023-12-01', purchasePrice: 21000, currentValue: 21000, condition: 'excellent', status: 'active' },
      { name: 'Office Space - 5th Floor', category: 'property', serialNumber: 'OFF-5FL', purchaseDate: '2022-01-01', purchasePrice: 500000, currentValue: 550000, condition: 'excellent', status: 'active', maintenanceSchedule: 'quarterly' }
    ];

    for (const assetData of assetsData) {
      await PhysicalAsset.create(assetData);
    }
    console.log(`  ✓ Created ${assetsData.length} assets`);

    // ===========================================
    // SUMMARY
    // ===========================================
    console.log('\n\n🎉 Mission Control Seeding Complete!\n');
    console.log('========================================');
    console.log(`✅ Generals: ${generals.length}`);
    console.log(`✅ Departments: ${departments.length}`);
    console.log(`✅ People: ${people.length}`);
    console.log(`✅ Projects: ${projects.length}`);
    console.log(`✅ Calendar Entries: ${calendarEntries.length}`);
    console.log(`✅ Diary Entries: ${diaryEntries.length}`);
    console.log(`✅ Assets: ${assetsData.length}`);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedMissionControl();
