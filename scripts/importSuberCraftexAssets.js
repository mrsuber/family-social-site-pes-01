const PhysicalAsset = require('../models/PhysicalAsset');
const General = require('../models/General');

async function importAssets() {
  try {
    console.log('📦 Importing SuberCraftex Capital Equipment...\n');

    // Find General 1
    const general1 = await General.findOne({ where: { orderNumber: 1 } });
    if (!general1) throw new Error('General 1 not found');

    console.log(`✅ Found General 1: ${general1.name}\n`);

    // Woodworking Assets
    const woodworkingAssets = [
      { name: 'Water pressure pump/washer', price: 38600, current: 38600, type: 'machinery' },
      { name: 'Tool box', price: 38350, type: 'equipment' },
      { name: 'Cordless drill', price: 38750, type: 'power_tool' },
      { name: 'Tool box 2', price: 30800, type: 'equipment' },
      { name: 'Half inch router bits', price: 9500, type: 'tool' },
      { name: 'Crow bar', price: 2800, type: 'tool' },
      { name: 'Spot light', price: 17900, type: 'equipment' },
      { name: 'Oven', price: 111000, type: 'equipment' },
      { name: 'Ladder', price: 50550, type: 'equipment' },
      { name: 'Saw', price: 3900, type: 'tool' },
      { name: 'Jig saw', price: 33300, type: 'power_tool' },
      { name: 'Circular sander', price: 31600, type: 'power_tool' },
      { name: 'Planner', price: 190000, type: 'machinery' },
      { name: 'Water pump and pump control', price: 45000, type: 'machinery', notes: 'water pump 30000 and pump control 15000' },
      { name: 'Table clamp', price: 17400, type: 'tool' },
      { name: 'Axe', price: 4800, type: 'tool' },
      { name: 'Level', price: 4000, type: 'tool' },
      { name: 'Hand saw and saw blade', price: 5000, type: 'tool' },
      { name: 'Hand planer', price: 2700, type: 'tool' },
      { name: 'Gum press and gum', price: 5150, type: 'equipment' },
      { name: 'Trowel', price: 1250, type: 'tool' },
      { name: 'Planner 2', price: 45250, type: 'machinery' },
      { name: 'Router', price: 53950, type: 'power_tool' },
      { name: 'Screw driver', price: 2800, type: 'tool' },
      { name: 'Screw driver pack', price: 2350, type: 'tool' },
      { name: 'Chalk level', price: 1500, type: 'tool' },
      { name: 'Ear protection', price: 2300, type: 'safety' },
      { name: 'Soldering iron', price: 3200, type: 'tool' },
      { name: 'File set', price: 3900, type: 'tool' },
      { name: 'Chisel set', price: 6100, type: 'tool' },
      { name: 'Mallet', price: 1900, type: 'tool' },
      { name: 'Plier', price: 4400, type: 'tool' },
      { name: 'Plier pack', price: 7000, type: 'tool' },
      { name: 'Setting spanner', price: 4200, type: 'tool' },
      { name: 'Gas mask', price: 1300, type: 'safety' },
      { name: 'Filing disk', price: 550, type: 'consumable' },
      { name: 'Scissors pack', price: 1600, type: 'tool' },
      { name: 'Table saw', price: 205000, type: 'machinery' },
      { name: 'Wind blower', price: 27000, type: 'equipment' },
      { name: 'Table press saw', price: 233000, type: 'machinery' },
      { name: 'Trash bin', price: 6000, type: 'equipment' },
      { name: 'Safety shoes', price: 12000, type: 'safety' },
      { name: 'Distributors', price: 12000, type: 'equipment' },
      { name: 'Hand router', price: 32000, type: 'power_tool' },
      { name: 'Circular saw', price: 60000, type: 'power_tool' },
      { name: 'Electric vest', price: 8000, type: 'safety' },
      { name: 'Work overall', price: 18000, type: 'safety' },
      { name: 'Helmet', price: 14000, type: 'safety' },
      { name: 'Gloves', price: 6000, type: 'safety' },
      { name: '2 Wall packs', price: 5000, type: 'equipment' },
      { name: 'Clamps', price: 60000, type: 'tool' },
      { name: 'Matchet', price: 2100, type: 'tool' },
      { name: 'Screwdriver pack', price: 8000, type: 'tool' },
      { name: 'Scissors', price: 500, type: 'tool' },
      { name: 'Measuring tape', price: 2500, type: 'tool' },
      { name: 'Clips', price: 1000, type: 'consumable' },
      { name: 'Angle ruler', price: 3500, type: 'tool' },
      { name: 'Setting plier', price: 3000, type: 'tool' },
      { name: 'Stapler', price: 3300, type: 'tool' },
      { name: 'Zinc cutting scissors', price: 2000, type: 'tool' },
      { name: 'Ruler (small)', price: 2000, type: 'tool' },
      { name: 'Ruler (large)', price: 3000, type: 'tool' },
      { name: 'Brush pack', price: 4500, type: 'consumable' },
      { name: 'Brush', price: 1400, type: 'consumable' },
      { name: 'Wrench', price: 3500, type: 'tool' },
      { name: 'Pitcher', price: 3000, type: 'equipment' },
      { name: '2 Safety goggles', price: 4000, type: 'safety' },
      { name: 'Hand trowel', price: 3100, type: 'tool' },
      { name: 'Tool pack', price: 15000, type: 'equipment' },
      { name: '2 Epoxy gum', price: 5000, type: 'consumable' },
      { name: 'Hammer', price: 3000, type: 'tool' },
      { name: 'Hand saw holder', price: 2000, type: 'equipment' },
      { name: 'Circular saw blades', price: 9000, type: 'consumable' },
      { name: 'Angle grinder', price: 45000, type: 'power_tool' },
      { name: 'Spray gun', price: 42000, type: 'power_tool' },
      { name: 'Cord drill gun', price: 46000, type: 'power_tool' },
      { name: 'Heat gun', price: 32000, type: 'power_tool' },
      { name: '8 wheels', price: 5500, type: 'equipment' },
      { name: 'Wood glue', price: 3000, type: 'consumable' },
      { name: 'Anti rust', price: 3500, type: 'consumable' },
      { name: '2 Paint coating', price: 5000, type: 'consumable' },
      { name: 'Grease', price: 4000, type: 'consumable' },
      { name: 'Flat spanners set', price: 4000, type: 'tool' },
      { name: 'Pencil', price: 100, type: 'consumable' },
      { name: 'Tape 2', price: 2500, type: 'consumable' },
      { name: 'Adjustable circular saw', price: 32000, type: 'power_tool' },
      { name: 'Circular saw (small)', price: 5500, type: 'power_tool' },
      { name: 'Apple noise cancellation headphones', price: 400000, type: 'equipment' },
      { name: 'Drill press head', price: 3500, type: 'tool' },
      { name: 'Quarter shank router bits', price: 68000, type: 'tool' },
      { name: 'Cordless drill gun 2', price: 40000, type: 'power_tool' },
      { name: 'Fan', price: 12000, type: 'equipment' },
      { name: 'Diamond cutting drill press', price: 135000, type: 'machinery' },
      { name: 'Wood stock', price: 400000, type: 'inventory', notes: 'Raw material inventory' },
      { name: 'Iron brush', price: 3500, type: 'tool' },
      { name: 'Foam', price: 10000, type: 'consumable' },
      { name: 'Woodworking shop rent', price: 2640000, type: 'facility', notes: 'Annual/periodic rent' },
      { name: 'Laser level', price: 60900, type: 'tool' },
      { name: 'Wheels for wood shop table', price: 10000, type: 'equipment' },
      { name: 'Locks for house', price: 11000, type: 'equipment' },
      { name: '10 horse power motor', price: 180000, type: 'machinery' },
      { name: 'Table saw shaft', price: 70000, type: 'machinery' },
      { name: 'Rods and shaft', price: 120000, type: 'machinery' },
      { name: 'Transportation of horse power', price: 11000, type: 'expense' },
      { name: 'Bearings', price: 6000, type: 'machinery' },
      { name: 'Table saw (additional)', price: 9800, type: 'machinery' },
      { name: 'Hinges for table saw', price: 4500, type: 'equipment' },
      { name: 'Transportation/petrol', price: 35000, type: 'expense' },
      { name: 'Wood to build table saw', price: 11000, type: 'consumable' },
      { name: 'Jig saw blade', price: 10000, type: 'consumable' },
      { name: 'Horse power motor switch', price: 10000, type: 'equipment' },
      { name: 'Timing belt 2', price: 3000, type: 'consumable' },
      { name: 'Socket horse power motor', price: 500, type: 'equipment' }
    ];

    // Tailoring Assets
    const tailoringAssets = [
      { name: 'Mannequin making tape and dresses', price: 8500, type: 'equipment', dept: 'womens' },
      { name: 'Iron for dresses', price: 5000, type: 'equipment', dept: 'both' },
      { name: 'Sewing, zigzag, 2 embroidery machines', price: 756000, type: 'machinery', dept: 'both' },
      { name: 'Tailoring table', price: 120000, type: 'equipment', dept: 'both' },
      { name: 'Ironing table fabric (canvas and felt)', price: 46000, type: 'equipment', dept: 'both' },
      { name: 'Embroidery thread', price: 25900, type: 'consumable', dept: 'both' },
      { name: 'Sewing thread', price: 10300, type: 'consumable', dept: 'both' },
      { name: 'Embroidery sleeve', price: 24000, type: 'consumable', dept: 'both' },
      { name: 'Pins', price: 500, type: 'consumable', dept: 'both' },
      { name: 'Drawing paper', price: 1000, type: 'consumable', dept: 'both' },
      { name: 'Scissors', price: 5000, type: 'tool', dept: 'both' },
      { name: 'Thread cutter', price: 1300, type: 'tool', dept: 'both' },
      { name: 'Thimble', price: 200, type: 'tool', dept: 'both' },
      { name: 'Transportation of tailoring equipment', price: 60000, type: 'expense', dept: 'both' }
    ];

    console.log('📦 Adding Woodworking Assets...\n');
    let woodCount = 0;
    for (const asset of woodworkingAssets) {
      await PhysicalAsset.create({
        name: asset.name,
        assetType: asset.type,
        purchaseCost: asset.price,
        currency: 'XAF',
        location: 'Buea',
        status: 'active',
        acquisitionStatus: 'acquired',
        generalId: general1.id,
        notes: asset.notes || null
      });
      woodCount++;
      if (woodCount % 20 === 0) {
        console.log(`  ✅ Added ${woodCount} assets...`);
      }
    }
    console.log(`✅ Completed: ${woodCount} woodworking assets\n`);

    console.log('📦 Adding Tailoring Assets...\n');
    let tailorCount = 0;
    for (const asset of tailoringAssets) {
      await PhysicalAsset.create({
        name: asset.name,
        assetType: asset.type,
        purchaseCost: asset.price,
        currency: 'FCFA',
        location: 'Buea',
        status: 'active',
        acquisitionStatus: 'acquired',
        generalId: general1.id,
        notes: asset.dept === 'both' ? 'Shared equipment' : null
      });
      tailorCount++;
    }
    console.log(`✅ Completed: ${tailorCount} tailoring assets\n`);

    const totalAssets = woodCount + tailorCount;
    const totalValue = woodworkingAssets.reduce((sum, a) => sum + a.price, 0) +
                       tailoringAssets.reduce((sum, a) => sum + a.price, 0);

    console.log('🎉 Asset import complete!\n');
    console.log('📊 Summary:');
    console.log(`   🪚 Woodworking assets: ${woodCount}`);
    console.log(`   ✂️  Tailoring assets: ${tailorCount}`);
    console.log(`   📦 Total assets: ${totalAssets}`);
    console.log(`   💰 Total value: ${totalValue.toLocaleString()} XAF`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

importAssets();
