const { sequelize } = require('../config/db');
const migration = require('../migrations/createIslamicLMSTables');

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('\n🔄 Running Islamic LMS migration...');

    const queryInterface = sequelize.getQueryInterface();
    await migration.up(queryInterface, sequelize.Sequelize);

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Islamic LMS Tables Created:');
    console.log('   1. islamic_course_modules');
    console.log('   2. islamic_lessons');
    console.log('   3. islamic_resources');
    console.log('   4. islamic_assignments');
    console.log('   5. user_course_progress');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
