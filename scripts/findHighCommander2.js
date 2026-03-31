require('dotenv').config();
const { sequelize } = require('../config/db');
const General = require('../models/General');
const Person = require('../models/Person');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Find High Commander person
    const highCommander = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (highCommander) {
      console.log('Found High Commander:');
      console.log(`  Name: ${highCommander.fullName}`);
      console.log(`  ID: ${highCommander.id}`);
      console.log(`  General ID: ${highCommander.generalId || 'None'}\n`);

      if (highCommander.generalId) {
        const general = await General.findByPk(highCommander.generalId);
        if (general) {
          console.log('High Commander belongs to General:');
          console.log(`  - ${general.name} (ID: ${general.id})\n`);
        }
      } else {
        console.log('High Commander has no associated General.\n');
      }
    } else {
      console.log('❌ No High Commander person found.\n');
    }

    // List all Generals
    const allGenerals = await General.findAll({
      attributes: ['id', 'name', 'description']
    });

    console.log('All available Generals:');
    allGenerals.forEach(g => {
      console.log(`  - ${g.name} (ID: ${g.id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
