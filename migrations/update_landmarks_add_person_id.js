require('dotenv').config();
const { sequelize } = require('../config/db');

async function updateLandmarksTable() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    console.log('📋 Updating landmarks table...\n');

    // Make general_id nullable and add person_id column
    await sequelize.query(`
      ALTER TABLE landmarks
      ALTER COLUMN general_id DROP NOT NULL;
    `);
    console.log('✅ Made general_id nullable');

    await sequelize.query(`
      ALTER TABLE landmarks
      ADD COLUMN IF NOT EXISTS person_id UUID REFERENCES people(id) ON DELETE CASCADE;
    `);
    console.log('✅ Added person_id column');

    // Add index for person_id
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_landmarks_person_id ON landmarks(person_id);
    `);
    console.log('✅ Added index for person_id');

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ MIGRATION COMPLETED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating landmarks table:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

updateLandmarksTable();
