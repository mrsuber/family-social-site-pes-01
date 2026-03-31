const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');
const Department = require('../models/Department');

async function verifyAssets() {
  try {
    console.log('🔍 Verifying SuberCraftex Assets Against PDF...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');

    // Find departments
    const woodworkingDept = await Department.findOne({
      where: { generalId: general1.id, name: 'Woodworking & Furniture' }
    });
    const mensTailoringDept = await Department.findOne({
      where: { generalId: general1.id, name: 'Men\'s Tailoring & Bespoke' }
    });
    const womensTailoringDept = await Department.findOne({
      where: { generalId: general1.id, name: 'Women\'s Tailoring & Couture' }
    });

    // Get all assets
    const allAssets = await PhysicalAsset.findAll({
      where: { generalId: general1.id },
      order: [['departmentId', 'ASC'], ['name', 'ASC']]
    });

    console.log(`📦 Total Assets Found: ${allAssets.length}\n`);

    // Group by department
    const woodworking = allAssets.filter(a => a.departmentId === woodworkingDept?.id);
    const mensTailoring = allAssets.filter(a => a.departmentId === mensTailoringDept?.id);
    const womensTailoring = allAssets.filter(a => a.departmentId === womensTailoringDept?.id);

    console.log(`🪚 Woodworking Assets (${woodworking.length}):`);
    console.log('=====================================');
    let woodTotal = 0;
    woodworking.forEach((asset, i) => {
      console.log(`${(i+1).toString().padStart(3)}. ${asset.name.padEnd(50)} ${asset.purchasePrice.toLocaleString().padStart(12)} FCFA (${asset.acquisitionStatus})`);
      woodTotal += asset.purchasePrice;
    });
    console.log(`\n💰 Woodworking Total: ${woodTotal.toLocaleString()} FCFA\n`);

    console.log(`✂️  Men's Tailoring Assets (${mensTailoring.length}):`);
    console.log('=====================================');
    let mensTotal = 0;
    mensTailoring.forEach((asset, i) => {
      console.log(`${(i+1).toString().padStart(3)}. ${asset.name.padEnd(50)} ${asset.purchasePrice.toLocaleString().padStart(12)} FCFA (${asset.acquisitionStatus})`);
      mensTotal += asset.purchasePrice;
    });
    console.log(`\n💰 Men's Tailoring Total: ${mensTotal.toLocaleString()} FCFA\n`);

    console.log(`✂️  Women's Tailoring Assets (${womensTailoring.length}):`);
    console.log('=====================================');
    let womensTotal = 0;
    womensTailoring.forEach((asset, i) => {
      console.log(`${(i+1).toString().padStart(3)}. ${asset.name.padEnd(50)} ${asset.purchasePrice.toLocaleString().padStart(12)} FCFA (${asset.acquisitionStatus})`);
      womensTotal += asset.purchasePrice;
    });
    console.log(`\n💰 Women's Tailoring Total: ${womensTotal.toLocaleString()} FCFA\n`);

    const grandTotal = woodTotal + mensTotal + womensTotal;
    console.log('========================================');
    console.log(`💰 GRAND TOTAL: ${grandTotal.toLocaleString()} FCFA`);
    console.log('========================================');
    console.log(`📋 PDF Total Should Be: 7,165,550 FCFA`);
    console.log(`✅ Match: ${grandTotal === 7165550 ? 'YES' : 'NO - MISMATCH!'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

verifyAssets();
