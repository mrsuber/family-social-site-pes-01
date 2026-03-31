const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');

async function deleteAssets() {
  try {
    console.log('🗑️  Deleting All SuberCraftex Assets...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');

    // Delete all assets for General 1
    const deleted = await PhysicalAsset.destroy({
      where: { generalId: general1.id }
    });

    console.log(`✅ Deleted ${deleted} assets from General 1\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

deleteAssets();
