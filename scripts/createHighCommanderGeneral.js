require('dotenv').config();
const { sequelize } = require('../config/db');
const General = require('../models/General');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Check if High Commander General already exists
    const existing = await General.findOne({
      where: { name: 'High Commander - Personal Goals' }
    });

    if (existing) {
      console.log('✅ High Commander General already exists:');
      console.log(`   ${existing.name} (ID: ${existing.id})\n`);
      process.exit(0);
    }

    // Get the highest orderNumber
    const maxOrder = await General.max('orderNumber');
    const nextOrderNumber = (maxOrder || 0) + 1;

    // Create High Commander General
    const highCommanderGeneral = await General.create({
      name: 'High Commander - Personal Goals',
      description: 'Personal goals, milestones, and strategic objectives for the High Commander',
      status: 'active',
      orderNumber: nextOrderNumber,
      commanderId: 'bd443b67-9479-4ebc-8651-05658eddd9f2' // Mohamad Siysinyuy's ID
    });

    console.log('✅ High Commander General created successfully!');
    console.log(`   Name: ${highCommanderGeneral.name}`);
    console.log(`   ID: ${highCommanderGeneral.id}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating High Commander General:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
})();
