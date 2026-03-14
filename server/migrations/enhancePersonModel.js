require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');

async function enhancePersonModel() {
  try {
    await connectDB();
    console.log('🔧 Enhancing Person model with new fields...\n');

    // Add new columns to people table
    await sequelize.query(`
      ALTER TABLE people
      ADD COLUMN IF NOT EXISTS assignment_status VARCHAR(50) DEFAULT 'assigned',
      ADD COLUMN IF NOT EXISTS department_id UUID,
      ADD COLUMN IF NOT EXISTS education_level VARCHAR(100),
      ADD COLUMN IF NOT EXISTS interests TEXT,
      ADD COLUMN IF NOT EXISTS problems TEXT,
      ADD COLUMN IF NOT EXISTS social_media_links JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS photo_gallery JSONB DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS related_people JSONB DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS chat_transcripts JSONB DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS facebook VARCHAR(255),
      ADD COLUMN IF NOT EXISTS instagram VARCHAR(255),
      ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50);
    `);

    console.log('✅ Added new person fields:');
    console.log('   - assignment_status (assigned, personal_circle, evaluating)');
    console.log('   - department_id (for departmental structure)');
    console.log('   - education_level');
    console.log('   - interests (what they love)');
    console.log('   - problems (challenges they face)');
    console.log('   - social_media_links (JSON)');
    console.log('   - photo_gallery (JSON array)');
    console.log('   - related_people (JSON array of person IDs)');
    console.log('   - documents (JSON array)');
    console.log('   - chat_transcripts (JSON array)');
    console.log('   - facebook, instagram, whatsapp\n');

    // Create departments table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        general_id UUID REFERENCES generals(id) ON DELETE CASCADE,
        project_id UUID,
        order_number INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        objectives JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Created departments table');

    // Create commander_diary table for daily mission reports
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS commander_diary (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        person_id UUID REFERENCES people(id) ON DELETE CASCADE,
        entry_date DATE NOT NULL,
        entry_type VARCHAR(20) DEFAULT 'text',
        text_content TEXT,
        audio_url TEXT,
        audio_duration INTEGER,
        mood VARCHAR(50),
        tags JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Created commander_diary table');

    // Create commander_calendar table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS commander_calendar (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        person_id UUID REFERENCES people(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL,
        event_type VARCHAR(50) DEFAULT 'task',
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(20) DEFAULT 'medium',
        reminder_minutes INTEGER DEFAULT 30,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Created commander_calendar table');

    // Add indexes
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_people_assignment_status ON people(assignment_status);
      CREATE INDEX IF NOT EXISTS idx_people_department_id ON people(department_id);
      CREATE INDEX IF NOT EXISTS idx_departments_general_id ON departments(general_id);
      CREATE INDEX IF NOT EXISTS idx_diary_person_date ON commander_diary(person_id, entry_date);
      CREATE INDEX IF NOT EXISTS idx_calendar_person_date ON commander_calendar(person_id, event_date);
    `);

    console.log('✅ Added indexes\n');

    // Update existing people to have assignment_status
    await sequelize.query(`
      UPDATE people
      SET assignment_status =
        CASE
          WHEN general_id IS NOT NULL THEN 'assigned'
          WHEN relationship_type = 'high_commander' THEN 'commander'
          ELSE 'personal_circle'
        END
      WHERE assignment_status IS NULL;
    `);

    console.log('✅ Updated existing people with assignment_status\n');

    console.log('='.repeat(50));
    console.log('✅ Person model enhancement complete!');
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error enhancing person model:', error);
    process.exit(1);
  }
}

enhancePersonModel();
