require('dotenv').config();
const { sequelize } = require('../config/db');

async function createLandmarksTable() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    console.log('📋 Creating landmarks table...\n');

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS landmarks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        general_id UUID NOT NULL REFERENCES generals(id) ON DELETE CASCADE,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        amount DECIMAL(12, 2),
        currency VARCHAR(10) DEFAULT 'USD',
        payment_status VARCHAR(50) DEFAULT 'pending',
        amount_paid DECIMAL(12, 2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(50) DEFAULT 'medium',
        progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
        category VARCHAR(100),
        assigned_to JSONB DEFAULT '[]'::jsonb,
        related_resources JSONB DEFAULT '[]'::jsonb,
        checklist JSONB DEFAULT '[]'::jsonb,
        tags TEXT[],
        photos JSONB DEFAULT '[]'::jsonb,
        notes TEXT,
        updates_log JSONB DEFAULT '[]'::jsonb,
        reminder_days INTEGER DEFAULT 7,
        completed_at TIMESTAMP WITH TIME ZONE,
        completed_by UUID REFERENCES people(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log('✅ Landmarks table created successfully\n');

    console.log('📋 Creating indexes...\n');

    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_landmarks_general_id ON landmarks(general_id);
      CREATE INDEX IF NOT EXISTS idx_landmarks_status ON landmarks(status);
      CREATE INDEX IF NOT EXISTS idx_landmarks_priority ON landmarks(priority);
      CREATE INDEX IF NOT EXISTS idx_landmarks_end_date ON landmarks(end_date);
    `);

    console.log('✅ Indexes created successfully\n');

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('✨ MIGRATION COMPLETED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('📊 Landmarks table is now ready to use!');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating landmarks table:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

createLandmarksTable();
