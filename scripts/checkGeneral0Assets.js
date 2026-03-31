const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');

async function check() {
  try {
    const general0 = await General.findOne({ where: { orderNumber: 0 } });
    if (!general0) {
      console.log('❌ General 0 not found');
      process.exit(1);
    }

    console.log(`✅ Found General 0: ${general0.name} (ID: ${general0.id})\n`);

    const assets = await PhysicalAsset.findAll({
      where: { generalId: general0.id },
      order: [['acquisitionStatus', 'ASC'], ['name', 'ASC']]
    });

    console.log(`📦 General 0 Assets Count: ${assets.length}\n`);

    if (assets.length === 0) {
      console.log('⚠️  No assets found for General 0!');
      console.log('The addAssets.js script may not have been run yet.');
    } else {
      const acquired = assets.filter(a => a.acquisitionStatus === 'acquired');
      const target = assets.filter(a => a.acquisitionStatus === 'target');

      console.log(`✅ ACQUIRED Assets (${acquired.length}):`);
      acquired.forEach(a => console.log(`  - ${a.name}`));

      console.log(`\n🎯 TARGET Assets (${target.length}):`);
      target.forEach(a => console.log(`  - ${a.name}`));
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

check();
