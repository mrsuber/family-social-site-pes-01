require('dotenv').config();
const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

async function createDailyTimetablesTable() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    console.log('📝 Creating daily_timetables table...\n');

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS daily_timetables (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        day_type VARCHAR(20) NOT NULL DEFAULT 'weekday',
        time_blocks JSONB NOT NULL DEFAULT '[]',
        overall_completion INTEGER DEFAULT 0,
        adherence_score INTEGER DEFAULT 0,
        energy_level INTEGER DEFAULT 3,
        accomplishments TEXT,
        challenges TEXT,
        tomorrow_priority TEXT,
        notes TEXT,
        is_completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(person_id, date)
      );
    `, { type: QueryTypes.RAW });

    console.log('✅ Table daily_timetables created\n');

    console.log('📝 Creating indexes...\n');

    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_daily_timetables_person_id ON daily_timetables(person_id);
      CREATE INDEX IF NOT EXISTS idx_daily_timetables_date ON daily_timetables(date);
    `, { type: QueryTypes.RAW });

    console.log('✅ Indexes created\n');

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ DAILY TIMETABLES TABLE CREATED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating table:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

createDailyTimetablesTable();
