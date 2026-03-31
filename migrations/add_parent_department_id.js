const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

async function addParentDepartmentId() {
  try {
    console.log('Adding parent_department_id column to departments table...');

    // Check if column already exists
    const [results] = await sequelize.query(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_name='departments'
       AND column_name='parent_department_id';`,
      { type: QueryTypes.SELECT }
    );

    if (results) {
      console.log('Column parent_department_id already exists. Skipping...');
      return;
    }

    // Add the column
    await sequelize.query(
      `ALTER TABLE departments
       ADD COLUMN parent_department_id UUID REFERENCES departments(id) ON DELETE SET NULL;`
    );

    console.log('✅ Successfully added parent_department_id column!');

    // Add index for better performance
    await sequelize.query(
      `CREATE INDEX idx_departments_parent_department_id
       ON departments(parent_department_id);`
    );

    console.log('✅ Successfully added index on parent_department_id!');

  } catch (error) {
    console.error('❌ Error adding parent_department_id:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  addParentDepartmentId()
    .then(() => {
      console.log('Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = addParentDepartmentId;
