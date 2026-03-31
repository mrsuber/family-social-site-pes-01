const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');

async function listAssets() {
  try {
    console.log('📋 Listing All SuberCraftex Assets...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');

    console.log(`✅ Found General 1: ${general1.name}\n`);

    // Get all assets for General 1
    const assets = await PhysicalAsset.findAll({
      where: { generalId: general1.id },
      order: [['purchaseCost', 'DESC']]
    });

    console.log(`📦 Total Assets: ${assets.length}\n`);
    console.log('=====================================\n');

    let total = 0;
    assets.forEach((asset, i) => {
      const price = parseFloat(asset.purchaseCost);
      total += price;
      console.log(`${(i+1).toString().padStart(3)}. ${asset.name.padEnd(55)} ${price.toLocaleString().padStart(12)} ${asset.currency} (${asset.acquisitionStatus})`);
    });

    console.log('\n=====================================');
    console.log(`💰 TOTAL: ${total.toLocaleString()} XAF`);
    console.log('=====================================');
    console.log(`📋 PDF Total: 7,165,550 XAF`);
    console.log(`✅ Match: ${total === 7165550 ? 'YES ✓' : 'NO - MISMATCH! Difference: ' + (total - 7165550).toLocaleString()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

listAssets();
