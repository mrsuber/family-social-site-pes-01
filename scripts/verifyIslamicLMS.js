require('dotenv').config();
const { sequelize } = require('../config/db');
const Department = require('../models/Department');
const IslamicCourseModule = require('../models/IslamicCourseModule');
const IslamicLesson = require('../models/IslamicLesson');
const IslamicResource = require('../models/IslamicResource');
const IslamicAssignment = require('../models/IslamicAssignment');

async function verify() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Get counts
    const moduleCount = await IslamicCourseModule.count();
    const lessonCount = await IslamicLesson.count();
    const resourceCount = await IslamicResource.count();
    const assignmentCount = await IslamicAssignment.count();

    console.log('📊 Database Statistics:');
    console.log(`   Modules: ${moduleCount}`);
    console.log(`   Lessons: ${lessonCount}`);
    console.log(`   Resources: ${resourceCount}`);
    console.log(`   Assignments: ${assignmentCount}`);
    console.log('');

    // Get Introduction & Foundation department
    const introDept = await Department.findOne({
      where: { name: 'Introduction & Foundation' }
    });

    if (!introDept) {
      console.log('❌ Introduction & Foundation department not found');
      process.exit(1);
    }

    console.log('📖 Introduction & Foundation Department:');
    console.log(`   ID: ${introDept.id}`);
    console.log(`   Objectives: ${introDept.objectives.length}`);
    console.log('');

    // Get modules for this department
    const modules = await IslamicCourseModule.findAll({
      where: { departmentId: introDept.id },
      order: [['orderNumber', 'ASC']]
    });

    console.log(`🎯 Modules (${modules.length}):`);
    for (const module of modules) {
      const lessons = await IslamicLesson.count({ where: { moduleId: module.id } });
      console.log(`   ${module.orderNumber + 1}. ${module.objectiveTitle}`);
      console.log(`      → ${lessons} lessons`);
    }
    console.log('');

    // Get a sample lesson with all details
    const sampleLesson = await IslamicLesson.findOne({
      include: [
        {
          model: IslamicResource,
          as: 'resources'
        },
        {
          model: IslamicAssignment,
          as: 'assignments'
        }
      ]
    });

    if (sampleLesson) {
      console.log('📝 Sample Lesson:');
      console.log(`   Title: ${sampleLesson.name}`);
      console.log(`   Content length: ${sampleLesson.detail?.length || 0} characters`);
      console.log(`   Key points: ${sampleLesson.keyPoints?.length || 0}`);
      console.log(`   Resources: ${sampleLesson.resources?.length || 0}`);
      console.log(`   Assignments: ${sampleLesson.assignments?.length || 0}`);
    }

    console.log('\n✅ Islamic LMS verification completed!');
    console.log('\n🚀 System is ready to use. Navigate to Mission Control and click on');
    console.log('   any General 5 department objective to explore the courses!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verify();
