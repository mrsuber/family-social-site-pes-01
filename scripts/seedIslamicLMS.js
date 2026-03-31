require('dotenv').config();
const { sequelize } = require('../config/db');
const Department = require('../models/Department');
const IslamicCourseModule = require('../models/IslamicCourseModule');
const IslamicLesson = require('../models/IslamicLesson');
const IslamicResource = require('../models/IslamicResource');
const IslamicAssignment = require('../models/IslamicAssignment');

async function seedIslamicLMS() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Get General 5 ID
    const general5Id = '68e878f0-b17a-4877-b161-4f430d392509';

    // Get all General 5 departments
    const departments = await Department.findAll({
      where: { generalId: general5Id }
    });

    console.log(`📚 Found ${departments.length} Islamic departments\n`);

    // Clear existing data
    console.log('🧹 Clearing existing Islamic LMS data...');
    await IslamicAssignment.destroy({ where: {} });
    await IslamicResource.destroy({ where: {} });
    await IslamicLesson.destroy({ where: {} });
    await IslamicCourseModule.destroy({ where: {} });
    console.log('✅ Cleared existing data\n');

    // Seed each department
    for (const dept of departments) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📖 Seeding: ${dept.name}`);
      console.log('='.repeat(60));

      await seedDepartment(dept);
    }

    console.log('\n\n🎉 Islamic LMS seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    console.error(error);
    process.exit(1);
  }
}

async function seedDepartment(department) {
  const objectives = Array.isArray(department.objectives)
    ? department.objectives
    : JSON.parse(department.objectives || '[]');

  if (objectives.length === 0) {
    console.log('  ⚠️  No objectives found, skipping...');
    return;
  }

  // Get content based on department name
  const content = getContentForDepartment(department.name);

  // Create modules from objectives
  for (let i = 0; i < objectives.length; i++) {
    const objective = objectives[i];
    console.log(`\n  📌 Module ${i + 1}: ${objective}`);

    const module = await IslamicCourseModule.create({
      departmentId: department.id,
      objectiveTitle: objective,
      description: content.modules[i]?.description || `Study module covering: ${objective}`,
      orderNumber: i,
      status: 'published',
      estimatedHours: content.modules[i]?.estimatedHours || 10
    });

    console.log(`     ✅ Module created`);

    // Add lessons for this module
    const lessons = content.modules[i]?.lessons || [];
    for (let j = 0; j < lessons.length; j++) {
      const lessonData = lessons[j];

      const lesson = await IslamicLesson.create({
        moduleId: module.id,
        name: lessonData.name,
        detail: lessonData.detail,
        anchorName: lessonData.name.toLowerCase().replace(/\s+/g, '-'),
        orderNumber: j,
        images: lessonData.images || [],
        videos: lessonData.videos || [],
        keyPoints: lessonData.keyPoints || []
      });

      console.log(`        📝 Lesson ${j + 1}: ${lessonData.name}`);

      // Add resources for this lesson
      if (lessonData.resources) {
        for (const resourceData of lessonData.resources) {
          await IslamicResource.create({
            lessonId: lesson.id,
            ...resourceData
          });
          console.log(`           📚 Resource: ${resourceData.name}`);
        }
      }

      // Add assignments for this lesson
      if (lessonData.assignments) {
        for (const assignmentData of lessonData.assignments) {
          await IslamicAssignment.create({
            lessonId: lesson.id,
            ...assignmentData
          });
          console.log(`           ✍️  Assignment: ${assignmentData.name}`);
        }
      }
    }
  }
}

function getContentForDepartment(deptName) {
  const contentMap = {
    'Introduction & Foundation': getIntroductionContent(),
    'Quranic Studies': getQuranicStudiesContent(),
    'Hadith Sciences': getHadithContent(),
    'Seerah (Leadership & Character)': getSeerahContent(),
    'Journey of Islam (Chronological Revelation)': getJourneyContent(),
    'Arabic Language & Islamic Linguistics': getArabicContent(),
    'Council of Reflection & Interpretation': getCouncilContent()
  };

  return contentMap[deptName] || getDefaultContent();
}

function getIntroductionContent() {
  return {
    modules: [
      {
        description: 'The complete philosophical and practical framework for why Islamic governance was chosen as the operating system for a multi-generational, multi-planetary civilization.',
        estimatedHours: 15,
        lessons: [
          {
            name: 'The Multi-Generational Challenge',
            detail: `When building a civilization designed to span generations and eventually reach across star systems, one fundamental question emerges: What holds it together?\n\nA corporation optimizes for quarterly profits. A democracy operates in election cycles. Both are tied to the immediate, the visible, the measurable in human lifetimes.\n\nBut what framework can maintain purpose, ethics, and direction across:\n• Generations who will never meet each other\n• Light-years of distance with years of communication delay\n• Technological changes we cannot yet imagine\n• Challenges that don't exist today\n\nThis is where we must think differently. We need an operating system that transcends time, space, and circumstance while remaining deeply human.`,
            keyPoints: [
              'Traditional governance systems optimize for short-term cycles (quarters, election terms)',
              'Multi-generational projects require frameworks that transcend individual lifetimes',
              'Space colonization adds distance and communication delays to the challenge',
              'We need unchanging principles with adaptive implementation'
            ],
            resources: [
              {
                name: 'The Fallacy of Short-Termism in Governance',
                type: 'article',
                link: 'https://www.example.com/short-term-governance',
                author: 'Various',
                description: 'Analysis of how modern governance structures fail at long-term thinking',
                isRequired: false,
                orderNumber: 0
              }
            ],
            assignments: [
              {
                name: 'Reflection: Your Generation Ship',
                type: 'reflection',
                description: 'Imagine you are designing a generation ship that will travel for 200 years to reach another star system. The people who arrive will be the great-great-grandchildren of those who departed. What governing principles would you embed to ensure they stay unified and purposeful? Write 500-750 words.',
                completionCriteria: 'Thoughtful analysis addressing: (1) maintaining purpose across generations, (2) handling unforeseen challenges, (3) preserving ethics and values, (4) balancing stability with adaptation',
                estimatedMinutes: 45,
                orderNumber: 0,
                submissionRequired: true
              }
            ]
          },
          {
            name: 'Why Islam? The Honest Question',
            detail: `Let's address this directly: Why Islam specifically?\n\nNot because of cultural bias. Not because of tradition. But because of three unique characteristics:\n\n1. UNCHANGING FOUNDATION\nThe Quran has remained unchanged for 1,400 years. This isn't just a claim - it's verifiable through manuscript evidence. For a multi-generational project, you need an anchor that doesn't drift.\n\n2. PROVEN LONGEVITY\nIslamic civilization has already demonstrated the ability to maintain unity and purpose across:\n• Multiple continents\n• Diverse cultures and languages\n• Centuries of time\n• Technological eras from pre-industrial to modern\n\n3. BUILT-IN FLEXIBILITY\nHere's the key: Islam distinguishes between unchanging principles (Quran) and contextual application (Ijtihad - independent reasoning). The framework itself acknowledges that new situations will arise and provides a methodology for addressing them.\n\nThis isn't blind faith. It's pragmatic systems thinking.`,
            keyPoints: [
              'The Quran provides an unchanging textual foundation verified across 1,400 years',
              'Islamic civilization has already proven multi-generational, multi-continental unity',
              'The system explicitly includes mechanisms for addressing novel situations (Ijtihad)',
              'Faith and reason are complementary, not contradictory in this framework'
            ],
            resources: [
              {
                name: 'The History of the Quranic Text',
                type: 'book',
                author: 'Muhammad Mustafa Al-Azami',
                description: 'Academic examination of Quranic manuscript preservation',
                isRequired: true,
                orderNumber: 0
              },
              {
                name: 'Lost Islamic History',
                type: 'book',
                author: 'Firas Alkhateeb',
                description: 'Overview of Islamic civilization\'s geographic and temporal span',
                isRequired: false,
                orderNumber: 1
              }
            ],
            assignments: [
              {
                name: 'Compare Governance Systems',
                type: 'research',
                description: 'Research and compare three governance systems (e.g., constitutional democracy, communism, monarchism) in terms of their ability to maintain unity and purpose across multiple generations. Create a comparison table addressing: founding principles, adaptation mechanisms, historical longevity, and multi-cultural applicability.',
                completionCriteria: 'Completed comparison table with at least 4 criteria for 3+ systems',
                estimatedMinutes: 90,
                orderNumber: 0,
                submissionRequired: true
              }
            ]
          },
          {
            name: 'The Quran as Signs, Not Science Textbook',
            detail: `This is crucial: The Quran is not a physics textbook. It's a book of signs (Ayat).\n\nWhat's the difference?\n\nA textbook tells you: "The speed of light is 299,792,458 m/s"\nA sign points you to investigate: "Do they not look at the camels, how they are created? And at the sky, how it is raised?" (Quran 88:17-18)\n\nThe Quran:\n• Does not give you equations\n• Does not provide technical specifications\n• Does not compete with scientific discovery\n\nWhat it does:\n• Encourages observation and reflection\n• Establishes that the natural world has order and purpose\n• Demands that you use reason to understand creation\n• Provides the WHY, invites you to discover the HOW\n\nThis is exactly what you want in a multi-generational framework:\n• The principles don't become obsolete as science advances\n• Each generation is encouraged to push understanding further\n• Faith and scientific inquiry are mutually reinforcing\n\nWhen the Quran says "reflect," "observe," "think," "ponder" - it's not optional poetry. It's a command to engage with reality using your intellect.`,
            keyPoints: [
              'The Quran provides signs (Ayat) that point to investigation, not complete scientific explanations',
              'Quranic verses encourage observation, reflection, and use of reason',
              'Faith provides the WHY (purpose), science provides the HOW (mechanism)',
              'This framework prevents conflict between religion and scientific advancement',
              'Each generation can advance knowledge without contradicting foundational text'
            ],
            resources: [
              {
                name: 'The Quran and Modern Science',
                type: 'article',
                link: 'https://www.example.com/quran-science',
                author: 'Various Scholars',
                description: 'Discussion on the relationship between Quranic verses and scientific inquiry',
                isRequired: true,
                orderNumber: 0
              }
            ],
            assignments: [
              {
                name: 'Analyze a Quranic Sign',
                type: 'reading',
                description: 'Choose one Quranic verse that references the natural world (e.g., verses about rain cycle, mountains, embryology, celestial bodies). Read the verse in context, then research the scientific understanding of the phenomenon. Write 300-500 words explaining: (1) What the verse points to, (2) What modern science has discovered, (3) How this demonstrates "signs" vs "textbook" approach.',
                completionCriteria: 'Clear explanation of the verse, relevant scientific facts, and analysis of the relationship between faith and discovery',
                estimatedMinutes: 60,
                orderNumber: 0,
                submissionRequired: true
              }
            ]
          },
          {
            name: 'The Golden Age Model: When It Worked',
            detail: `The Islamic Golden Age (roughly 8th-14th centuries) is not mythology. It's documented history.\n\nDuring this period, the Islamic world led in:\n• Mathematics (algebra is an Arabic word)\n• Astronomy (we still use Arabic star names)\n• Medicine (hospitals, surgical techniques)\n• Chemistry (distillation, chemical processes)\n• Philosophy (preserved and expanded Greek thought)\n• Engineering (irrigation, optics, mechanics)\n\nWhy did it flourish?\n\nBecause scholars understood the exact framework we're discussing:\n• The Quran commanded them to seek knowledge\n• They had unchanging ethical principles\n• They used reason (Aql) to investigate the natural world\n• They engaged with and built upon knowledge from other civilizations\n• Faith provided purpose; reason provided method\n\nWhat we're building isn't theoretical. It's a proven model that worked for centuries across multiple continents, integrating diverse peoples while maintaining unity of purpose.\n\nThe question isn't "Can this work?" - history answers that. The question is "Can we recapture what made it work?"`,
            keyPoints: [
              'Islamic Golden Age led global advancement in multiple scientific fields for 600+ years',
              'Success came from combining unchanging principles with rigorous intellectual inquiry',
              'Scholars engaged with knowledge from all civilizations (Greek, Persian, Indian, Chinese)',
              'Faith and reason were seen as complementary paths to truth',
              'This model has historical proof-of-concept'
            ],
            resources: [
              {
                name: 'The House of Wisdom',
                type: 'book',
                author: 'Jim Al-Khalili',
                description: 'The story of the Islamic Golden Age and the quest for knowledge',
                isRequired: true,
                orderNumber: 0
              },
              {
                name: '1001 Inventions',
                type: 'website',
                link: 'https://www.1001inventions.com',
                author: '1001 Inventions',
                description: 'Interactive exploration of Muslim contributions to civilization',
                isRequired: false,
                orderNumber: 1
              }
            ],
            assignments: [
              {
                name: 'Golden Age Innovation Case Study',
                type: 'research',
                description: 'Choose one specific innovation from the Islamic Golden Age (e.g., Al-Khwarizmi\'s algebra, Ibn Sina\'s medical encyclopedia, Al-Biruni\'s measurement of Earth\'s radius). Research and write 400-600 words covering: the scholar\'s background, the innovation itself, how it built on previous knowledge, and its impact on later civilizations.',
                completionCriteria: 'Well-researched case study with historical facts, clear explanation of the innovation, and documented impact',
                estimatedMinutes: 75,
                orderNumber: 0,
                submissionRequired: true
              }
            ]
          }
        ]
      }
    ]
  };
}

function getQuranicStudiesContent() {
  return {
    modules: [
      {
        description: 'Fundamental understanding of the Quran: its structure, themes, and methods of interpretation (Tafsir)',
        estimatedHours: 20,
        lessons: [
          {
            name: 'Structure and Organization of the Quran',
            detail: `The Quran is organized into 114 chapters (Surahs) and over 6,000 verses (Ayat).\n\nKey structural elements:\n• Meccan vs Medinan revelations\n• Chronological vs compiled order\n• Themes and repeated concepts\n• Linguistic features of classical Arabic\n\nUnderstanding this structure is essential for proper interpretation.`,
            keyPoints: [
              '114 Surahs (chapters) varying in length from 3 to 286 verses',
              'Meccan Surahs focus on theology and faith; Medinan on community and law',
              'Compiled order is not chronological revelation order',
              'Understanding context is critical for interpretation'
            ]
          }
        ]
      },
      {
        description: 'Study of major Quranic themes: theology, morality, guidance for life',
        estimatedHours: 15,
        lessons: [
          {
            name: 'Core Theological Concepts',
            detail: `The Quran establishes fundamental concepts about:\n• Tawhid (Divine Unity)\n• Prophethood and revelation\n• Human purpose and accountability\n• Life after death\n\nThese form the foundation of Islamic worldview.`,
            keyPoints: [
              'Tawhid: Absolute oneness of God',
              'Prophets as messengers conveying divine guidance',
              'Humans as trustees (Khalifah) on Earth',
              'Day of Judgment and eternal consequences'
            ]
          }
        ]
      }
    ]
  };
}

function getHadithContent() {
  return {
    modules: [
      {
        description: 'Introduction to Hadith: the sayings and actions of Prophet Muhammad (peace be upon him)',
        estimatedHours: 18,
        lessons: [
          {
            name: 'What is Hadith?',
            detail: `Hadith are the recorded sayings, actions, and approvals of Prophet Muhammad (peace be upon him).\n\nThey serve to:\n• Explain and clarify Quranic verses\n• Provide practical examples of Islamic living\n• Establish Sunnah (prophetic tradition)\n• Offer guidance on matters not explicitly in Quran\n\nHadith are second only to Quran in Islamic authority.`,
            keyPoints: [
              'Hadith complement and explain the Quran',
              'Prophet Muhammad exemplified Quranic teachings in daily life',
              'Hadith sciences developed to verify authenticity',
              'Major collections: Sahih Bukhari, Sahih Muslim, and others'
            ]
          }
        ]
      }
    ]
  };
}

function getSeerahContent() {
  return {
    modules: [
      {
        description: 'The biography of Prophet Muhammad as a model of leadership, character, and governance',
        estimatedHours: 25,
        lessons: [
          {
            name: 'Early Life and Character Formation',
            detail: `Prophet Muhammad\'s early life (570-610 CE) shaped the leader he would become.\n\nKey aspects:\n• Orphaned early, raised by grandfather then uncle\n• Known as "Al-Amin" (The Trustworthy) before prophethood\n• Experience as shepherd and merchant\n• Marriage to Khadijah\n\nThis foundation of integrity and character preceded his prophetic mission.`,
            keyPoints: [
              'Early hardships built resilience and empathy',
              'Reputation for honesty established trust',
              'Commercial experience provided practical leadership skills',
              'Character was the foundation for spiritual authority'
            ]
          }
        ]
      }
    ]
  };
}

function getJourneyContent() {
  return {
    modules: [
      {
        description: 'Chronological unfolding of Quranic revelation mapped to historical events over 23 years',
        estimatedHours: 30,
        lessons: [
          {
            name: 'The Beginning: First Revelations',
            detail: `The Quranic revelation began in 610 CE when Prophet Muhammad was 40 years old.\n\nFirst revelation: "Read in the name of your Lord who created..." (Quran 96:1-5)\n\nThis marked:\n• The beginning of prophethood\n• Start of 23-year revelation period\n• Transition from private contemplation to public mission\n\nUnderstanding the context of each revelation enriches comprehension.`,
            keyPoints: [
              'First revelation emphasized knowledge and reading',
              'Revelation came in stages, not all at once',
              'Context of revelation affects interpretation',
              'Meccan period (610-622 CE) focused on faith foundations'
            ]
          }
        ]
      }
    ]
  };
}

function getArabicContent() {
  return {
    modules: [
      {
        description: 'Classical Arabic language study with focus on Quranic linguistics',
        estimatedHours: 40,
        lessons: [
          {
            name: 'Why Arabic Matters',
            detail: `The Quran was revealed in Arabic, and much meaning is tied to the language itself.\n\nKey reasons to study Arabic:\n• Nuances lost in translation\n• Multiple meanings of single words (relevant to interpretation)\n• Linguistic miracles and eloquence of the Quran\n• Direct access to original sources\n\nEven basic Arabic knowledge significantly enhances Quranic understanding.`,
            keyPoints: [
              'Quran\'s eloquence is a miracle in Arabic',
              'Single Arabic words can have layers of meaning',
              'Root word system provides depth',
              'Translation is interpretation, not replacement'
            ]
          }
        ]
      }
    ]
  };
}

function getCouncilContent() {
  return {
    modules: [
      {
        description: 'Framework for addressing novel situations through scholarly reflection combining revelation and reason',
        estimatedHours: 12,
        lessons: [
          {
            name: 'The Need for Contemporary Ijtihad',
            detail: `As civilization advances, new situations arise that have no direct precedent.\n\nExamples:\n• Genetic engineering and CRISPR\n• Artificial intelligence and consciousness\n• Space colonization ethics\n• Digital currency and blockchain\n\nThe Council of Reflection brings together:\n• Islamic scholars (understanding of principles)\n• Scientists and engineers (understanding of technology)\n• Ethicists and philosophers (understanding of implications)\n\nTogether they apply eternal principles to novel contexts.`,
            keyPoints: [
              'Ijtihad = independent reasoning within Islamic framework',
              'Novel situations require collaborative expertise',
              'Principles are unchanging; applications are contextual',
              'Both revelation and reason are necessary'
            ]
          }
        ]
      }
    ]
  };
}

function getDefaultContent() {
  return {
    modules: [
      {
        description: 'Foundational knowledge in this domain',
        estimatedHours: 10,
        lessons: [
          {
            name: 'Introduction',
            detail: 'Comprehensive introduction to this field of Islamic knowledge. Content to be expanded.',
            keyPoints: [
              'Foundational concepts',
              'Historical context',
              'Practical application',
              'Further study directions'
            ]
          }
        ]
      }
    ]
  };
}

seedIslamicLMS();
