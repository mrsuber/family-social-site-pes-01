require('dotenv').config();
const { sequelize } = require('../config/db');
const General = require('../models/General');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    const generals = await General.findAll({
      attributes: ['id', 'name', 'description']
    });

    console.log('Available Generals:');
    generals.forEach(g => {
      console.log(`  - ${g.name} (ID: ${g.id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
