const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

async function createBiographySectionsTable() {
  const queryInterface = sequelize.getQueryInterface();

  try {
    console.log('Creating biography_sections table...');

    await queryInterface.createTable('biography_sections', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      section_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      section_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      key_numbers: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      raw_diary_excerpt: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Create indexes
    await queryInterface.addIndex('biography_sections', ['person_id']);
    await queryInterface.addIndex('biography_sections', ['person_id', 'section_number'], {
      unique: true,
      name: 'biography_sections_person_section_unique'
    });

    console.log('✅ biography_sections table created successfully');
  } catch (error) {
    console.error('❌ Error creating biography_sections table:', error);
    throw error;
  }
}

// Run migration if called directly
if (require.main === module) {
  createBiographySectionsTable()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = createBiographySectionsTable;
