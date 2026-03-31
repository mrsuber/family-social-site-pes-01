const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');

async function fixCurrency() {
  try {
    console.log('💱 Fixing Asset Currency Codes...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');

    // Update all SuberCraftex assets from FCFA to XAF
    const [updated] = await PhysicalAsset.update(
      { currency: 'XAF' },
      {
        where: {
          generalId: general1.id,
          currency: 'FCFA'
        }
      }
    );

    console.log(`✅ Updated ${updated} assets from 'FCFA' to 'XAF'\n`);

    // Also update General 0 assets if any
    const general0 = await General.findOne({ where: { orderNumber: 0 } });
    if (general0) {
      const [updated0] = await PhysicalAsset.update(
        { currency: 'XAF' },
        {
          where: {
            generalId: general0.id,
            currency: 'FCFA'
          }
        }
      );
      console.log(`✅ Updated ${updated0} General 0 assets from 'FCFA' to 'XAF'\n`);
    }

    console.log('🎉 Currency fix complete!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixCurrency();
