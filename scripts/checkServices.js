const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('subercraftex_db', 'postgres', 'Wisdom@123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

async function checkServices() {
  try {
    const [services] = await sequelize.query(`
      SELECT id, service_name, category, status, description
      FROM services
      ORDER BY category, service_name
    `);

    console.log('Total services:', services.length);
    console.log('\nServices by category:');

    const byCategory = {};
    services.forEach(s => {
      const cat = s.category || 'Uncategorized';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push({
        name: s.service_name,
        status: s.status
      });
    });

    Object.keys(byCategory).sort().forEach(cat => {
      console.log(`\n${cat} (${byCategory[cat].length}):`);
      byCategory[cat].forEach(s => console.log(`  - ${s.name} [${s.status}]`));
    });

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkServices();
