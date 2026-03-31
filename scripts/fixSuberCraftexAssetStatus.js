const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');
const Department = require('../models/Department');

async function fixAssetStatus() {
  try {
    console.log('🔧 Fixing SuberCraftex Asset Acquisition Status...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');

    console.log(`✅ Found General 1: ${general1.name} (ID: ${general1.id})\n`);

    // Find all assets under General 1
    const assets = await PhysicalAsset.findAll({
      where: { generalId: general1.id }
    });

    console.log(`📦 Found ${assets.length} assets under General 1\n`);

    let updatedCount = 0;

    for (const asset of assets) {
      // Update all SuberCraftex assets to 'acquired' status
      await asset.update({
        acquisitionStatus: 'acquired',
        status: 'active'
      });

      console.log(`  ✅ Updated: ${asset.name} → acquired`);
      updatedCount++;
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} assets to 'acquired' status!`);
    console.log(`\nAll SuberCraftex capital equipment is now marked as already acquired.`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixAssetStatus();
