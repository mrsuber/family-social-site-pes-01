require('dotenv').config();
const { sequelize } = require('../config/db');
const General = require('../models/General');
const Person = require('../models/Person');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Check for High Commander in Generals
    const highCommanderGeneral = await General.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        '%high%commander%'
      )
    });

    if (highCommanderGeneral) {
      console.log('Found High Commander General:');
      console.log(`  - ${highCommanderGeneral.name} (ID: ${highCommanderGeneral.id})\n`);
    } else {
      console.log('No High Commander General found.\n');
    }

    // Check for High Commander in People
    const highCommanderPerson = await Person.findOne({
      where: {
        role: 'highCommander'
      }
    });

    if (highCommanderPerson) {
      console.log('Found High Commander Person:');
      console.log(`  - ${highCommanderPerson.firstName} ${highCommanderPerson.lastName} (ID: ${highCommanderPerson.id})`);
      console.log(`    Role: ${highCommanderPerson.role}\n`);
    } else {
      console.log('No High Commander Person found.\n');
    }

    // List all Generals for reference
    const allGenerals = await General.findAll({
      attributes: ['id', 'name']
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
