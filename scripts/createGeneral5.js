const General = require('../models/General');
const Department = require('../models/Department');
const { sequelize } = require('../config/db');

async function createGeneral5() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Create General 5: Islamic Governance & Studies
    const general5 = await General.create({
      name: 'Islamic Governance & Studies',
      description: 'The ethical and spiritual operating system for a multi-generational, multi-planetary civilization. Not just religion - a complete framework combining transcendent purpose, proven governance, and adaptive interpretation. Modeled after the Islamic Golden Age where science and faith flourished together.',
      orderNumber: 5,
      status: 'planning',
      objectives: [
        'Provide unchanging ethical foundation through Quranic principles',
        'Enable scientific advancement through interpretive flexibility',
        'Train all leaders in Islamic governance and knowledge domains',
        'Establish Council of Reflection for novel situations (space, AI, genetics)',
        'Maintain transcendent purpose across generations and light-years',
        'Integrate faith and reason as complementary tools',
        'Ensure humane governance from Earth to space settlements'
      ]
    });

    console.log('\n✅ General 5 created successfully!');
    console.log(`   Name: ${general5.name}`);
    console.log(`   Status: ${general5.status}`);
    console.log(`   ID: ${general5.id}`);

    // Create Knowledge Departments (Educational/Curriculum-Based)
    console.log('\n📚 Creating knowledge departments (curriculum structure)...');

    const departments = [
      {
        name: 'Introduction & Foundation',
        description: 'Gateway to Islamic governance. Complete philosophical reasoning: why Islam was chosen (evidence-based comparison of all systems), the interpretive framework (Quran as signs not textbook, reflection and reason required), Golden Age model (science + faith complementary), and how this enables the mission (transcendent purpose + ethical bounds for multi-planetary civilization).',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 1,
        objectives: [
          'Understand evidence-based selection of Islamic governance',
          'Master the interpretive framework: signs, reflection, reason',
          'Study Islamic Golden Age as model (8th-14th centuries)',
          'Recognize how faith provides WHY, science provides HOW',
          'Grasp the framework for space-age challenges'
        ]
      },
      {
        name: 'Quranic Studies',
        description: 'Deep study of the Quran as the constitutional foundation. Tafsir (interpretation methodology), thematic analysis (governance, ethics, cosmology, human nature), linguistic exploration (multiple meanings, context), and application to modern and space contexts. The Quran as book of signs to be reflected upon, not a science textbook.',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 2,
        objectives: [
          'Master Tafsir methodology and major interpretations',
          'Study thematic Quranic guidance on governance and ethics',
          'Understand linguistic depth and multiple Arabic meanings',
          'Apply Quranic principles to contemporary and future challenges',
          'Develop skills in reflection and reasoned interpretation'
        ]
      },
      {
        name: 'Hadith Sciences',
        description: 'Study of prophetic traditions and their authentication. Sahih collections (Bukhari, Muslim, others), hadith authentication methodology, prophetic guidance on governance, ethics, science, and community. Understanding how the Prophet\'s example complements and explains Quranic principles.',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 3,
        objectives: [
          'Study Sahih collections and authentication methods',
          'Extract prophetic guidance on leadership and governance',
          'Understand hadith application methodology',
          'Learn conflict resolution and ethical decision-making',
          'Apply prophetic wisdom to modern contexts'
        ]
      },
      {
        name: 'Seerah (Leadership & Character)',
        description: 'The Prophet\'s biography as leadership model. Character development, decision-making under uncertainty, building community from scratch, conflict resolution, governance structures, and prophetic example in all aspects of life. Focus on practical leadership lessons.',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 4,
        objectives: [
          'Study prophetic character and leadership qualities',
          'Analyze decision-making in critical situations',
          'Learn community-building principles from Medina',
          'Master conflict resolution and consensus-building',
          'Apply seerah lessons to organizational leadership'
        ]
      },
      {
        name: 'Journey of Islam (Chronological Revelation)',
        description: 'The complete 23-year chronological timeline mapping the Prophet\'s life events WITH exact Quranic revelations. Understanding WHY and WHEN each verse was revealed (asbab al-nuzul at deepest level). Walking through this journey reconstructs the entire Quran in revelation order, not Mushaf order. Essential for contextual understanding.',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 5,
        objectives: [
          'Master chronological order of Quranic revelation (23 years)',
          'Understand historical context for each revelation',
          'Study asbab al-nuzul (reasons for revelation) comprehensively',
          'Map verses to specific events in prophetic biography',
          'Grasp evolution of Islamic community and legislation'
        ]
      },
      {
        name: 'Arabic Language & Islamic Linguistics',
        description: 'Classical Arabic grammar (Nahw, Sarf), Quranic Arabic specifics, linguistic depth enabling multiple interpretations, and Arabic as the language of revelation. How linguistic mastery unlocks deeper Quranic understanding and enables adaptive interpretation for new realities.',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 6,
        objectives: [
          'Master classical Arabic grammar (Nahw and Sarf)',
          'Study Quranic Arabic linguistic structures',
          'Understand how single words carry multiple valid meanings',
          'Develop linguistic tools for Quranic interpretation',
          'Appreciate how language enables adaptive understanding'
        ]
      },
      {
        name: 'Council of Reflection & Interpretation',
        description: 'OPERATIONAL DEPARTMENT (unlike others in General 5). Scholars of Quran/Hadith + Scientists from General 4 working together to apply Islamic principles to unprecedented situations. Issues rulings for novel challenges: space travel ethics, AI consciousness, genetic modification, alien life, terraforming. Prevents both rigid literalism and ethical drift.',
        generalId: general5.id,
        status: 'planning',
        orderNumber: 7,
        objectives: [
          'Convene scholars and scientists for novel situations',
          'Apply Quranic principles to space-age challenges',
          'Issue rulings on AI, genetics, alien life, terraforming',
          'Maintain balance between principles and adaptation',
          'Prevent literalism blocking science OR abandoning ethics',
          'Ensure ethical governance across Earth and space'
        ]
      }
    ];

    for (const deptData of departments) {
      const dept = await Department.create(deptData);
      console.log(`   ✅ ${dept.name}`);
    }

    console.log('\n🎉 General 5 (Islamic Governance & Studies) setup complete!');
    console.log(`   General: ${general5.name}`);
    console.log(`   Total Departments: ${departments.length}`);
    console.log(`   Type: EDUCATIONAL (Curriculum-based, not operational)`);
    console.log(`   Status: PLANNING`);
    console.log('\n📖 THE OPERATING SYSTEM for Earth-to-Space Civilization');
    console.log('🕌 6 Knowledge Domains + 1 Operational Council');
    console.log('🎓 All leaders must master this curriculum');
    console.log('🧭 Faith provides WHY, Science (General 4) provides HOW');
    console.log('⚖️  Golden Age Model: Science and faith flourish together');
    console.log('\n💡 Key Innovation: Quran as SIGNS (reflection required), not textbook (rigid answers)');
    console.log('🌍→🚀 From Mecca to Mars: Transcendent purpose spans Earth and cosmos');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating General 5:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createGeneral5();
