const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

const General = require('../models/General');
const PhysicalAsset = require('../models/PhysicalAsset');

// XAF exchange rate (approximate): 1 USD = 600 XAF

const assetsToAdd = [
  // ACQUIRED ASSETS (Already Owned)
  {
    name: 'MacBook Pro 16" (Intel i7)',
    assetType: 'technology',
    acquisitionStatus: 'acquired',
    status: 'working',
    condition: 85,
    purchaseCost: 1500000, // 1,500,000 XAF (~$2,500)
    currency: 'XAF',
    location: 'Office',
    notes: `Specifications:
- Processor: 2.6GHz 6-Core Intel Core i7
- Graphics: Intel UHD Graphics 630 1536MB
- Memory: 16GB 2400 MHz DDR4
- Hard Disk: 499.96 GB
- macOS: Sonoma 14.5

Used for development and testing. Current depreciated value approximately 1,200,000 XAF.`,
    purchaseDate: new Date('2020-01-15'),
    lastMaintenanceDate: new Date('2024-01-10'),
    nextMaintenanceDate: new Date('2025-01-10')
  },
  {
    name: 'MacBook Pro 16" (Intel i9)',
    assetType: 'technology',
    acquisitionStatus: 'acquired',
    status: 'working',
    condition: 90,
    purchaseCost: 1800000, // 1,800,000 XAF (~$3,000)
    currency: 'XAF',
    location: 'Office',
    notes: `Specifications:
- Processor: 2.3GHz 8-Core Intel Core i9
- Graphics: AMD Radeon Pro 5500M 4GB + Intel UHD Graphics 630 1536MB
- Memory: 16GB 2667 MHz DDR4
- Hard Disk: 1TB
- macOS: Tahoe 26.0

Primary development machine for heavy workloads. Current depreciated value approximately 1,500,000 XAF.`,
    purchaseDate: new Date('2021-06-20'),
    lastMaintenanceDate: new Date('2024-06-01'),
    nextMaintenanceDate: new Date('2025-06-01')
  },
  {
    name: 'Starlink Internet Kit',
    assetType: 'equipment',
    acquisitionStatus: 'acquired',
    status: 'working',
    condition: 95,
    purchaseCost: 360000, // 360,000 XAF (~$600)
    currency: 'XAF',
    location: 'Office',
    serialNumber: 'KIT403562258ZN7',
    notes: `Starlink Kit Details:
- KID: 1060120e-07405d1c-1909557e
- Kit Number: KIT403562258ZN7

Primary internet connection for the organization. Provides reliable high-speed satellite internet. Monthly subscription required.`,
    purchaseDate: new Date('2023-03-10'),
    lastMaintenanceDate: new Date('2024-12-15'),
    nextMaintenanceDate: new Date('2025-06-15')
  },
  {
    name: '1000W UPS Battery Backup',
    assetType: 'equipment',
    acquisitionStatus: 'acquired',
    status: 'working',
    condition: 80,
    purchaseCost: 180000, // 180,000 XAF (~$300)
    currency: 'XAF',
    location: 'Office',
    notes: `1000 Watt UPS Battery Backup System
- Capacity: 1000W
- No solar panel attached yet (planned future upgrade)
- Used for power fluctuation protection and backup
- Protects critical equipment during power outages
- Battery health: Good, but needs regular monitoring

Note: Solar panel system planned for attachment to enable sustainable power backup.`,
    purchaseDate: new Date('2022-08-15'),
    lastMaintenanceDate: new Date('2025-01-20'),
    nextMaintenanceDate: new Date('2025-07-20')
  },
  {
    name: 'MTN Home Box Modem',
    assetType: 'equipment',
    acquisitionStatus: 'acquired',
    status: 'working',
    condition: 75,
    purchaseCost: 60000, // 60,000 XAF (~$100)
    currency: 'XAF',
    location: 'Office',
    notes: `MTN Home Box Internet Modem
- Backup internet connection in case Starlink fails
- 4G/LTE connectivity for redundancy
- Monthly data subscription required
- Essential for business continuity`,
    purchaseDate: new Date('2021-11-05'),
    lastMaintenanceDate: new Date('2024-11-15'),
    nextMaintenanceDate: new Date('2025-05-15')
  },

  // TARGET ASSETS (To Be Acquired)
  {
    name: 'iPhone 15 Pro (Testing Device)',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 720000, // 720,000 XAF (~$1,200)
    currency: 'XAF',
    location: 'To be determined',
    notes: `iPhone for iOS app development and testing.

Target specifications:
- iPhone 15 Pro or latest model
- 256GB storage minimum
- Required for testing iOS applications
- Will be used by development team
- Essential for multi-platform app development`,
    purchaseDate: null
  },
  {
    name: 'Samsung Galaxy S24 Ultra (Testing Device)',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 600000, // 600,000 XAF (~$1,000)
    currency: 'XAF',
    location: 'To be determined',
    notes: `Android flagship phone for testing.

Target specifications:
- Samsung Galaxy S24 Ultra or equivalent flagship
- 256GB+ storage
- Required for Android app development and testing
- High-end device for comprehensive testing across Android versions
- Complements iOS device for full mobile platform coverage`,
    purchaseDate: null
  },
  {
    name: 'Solar Panel System for UPS',
    assetType: 'equipment',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 480000, // 480,000 XAF (~$800)
    currency: 'XAF',
    location: 'Office',
    notes: `Solar panel system to attach to existing 1000W UPS.

Specifications needed:
- Compatible with 1000W UPS battery backup
- Minimum 1500W solar array
- Charge controller included
- Will provide sustainable power backup
- Reduce dependency on grid power
- Lower long-term operational costs

Priority: High - Critical for reliable power backup in area with frequent outages.`,
    purchaseDate: null
  },
  {
    name: 'Network Attached Storage (NAS)',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 420000, // 420,000 XAF (~$700)
    currency: 'XAF',
    location: 'Office',
    notes: `NAS for centralized data storage and backup.

Target specifications:
- 4-bay NAS system (Synology or QNAP)
- Minimum 8TB total storage (2x4TB in RAID 1 for redundancy)
- Gigabit Ethernet connectivity
- Automated backup for all development work
- Version control and file sharing
- Remote access capabilities

Benefits:
- Protect against data loss
- Centralized backup solution
- Team collaboration
- Redundant storage`,
    purchaseDate: null
  },
  {
    name: 'Uninterruptible Power Supply - 2000W',
    assetType: 'equipment',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 300000, // 300,000 XAF (~$500)
    currency: 'XAF',
    location: 'Office',
    notes: `Additional 2000W UPS for expanded operations.

Specifications:
- 2000W capacity
- Higher capacity for growing infrastructure
- Will protect additional equipment
- Redundancy for critical systems
- Pure sine wave output for sensitive electronics
- 4-6 hour backup time target`,
    purchaseDate: null
  },
  {
    name: 'High-Performance Development Workstation',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 1200000, // 1,200,000 XAF (~$2,000)
    currency: 'XAF',
    location: 'Office',
    notes: `High-performance desktop for development.

Target specifications:
- AMD Ryzen 9 7900X or Intel i9-13900K processor
- 32GB+ DDR5 RAM
- NVIDIA RTX 4060 Ti or better GPU
- 1TB NVMe Gen4 SSD + 2TB HDD
- 850W Gold-rated PSU

Use cases:
- Heavy development tasks
- Video editing and rendering
- 3D modeling and rendering
- Virtual machine testing
- Game development
- AI/ML workloads`,
    purchaseDate: null
  },
  {
    name: 'iPad Pro (Testing & Design)',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 540000, // 540,000 XAF (~$900)
    currency: 'XAF',
    location: 'Office',
    notes: `iPad Pro for iOS testing and design work.

Target specifications:
- iPad Pro 12.9" or 11" (latest generation)
- 256GB storage
- Apple Pencil (2nd generation) included
- Magic Keyboard optional

Use cases:
- UI/UX design with Procreate/Figma
- iOS app testing on tablet form factor
- Client presentations
- Digital note-taking and sketching
- Remote work flexibility`,
    purchaseDate: null
  },
  {
    name: '4K External Monitor 27"',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 240000, // 240,000 XAF (~$400)
    currency: 'XAF',
    location: 'Office',
    notes: `4K external monitor for productivity.

Target specifications:
- 27" or 32" 4K (3840x2160) display
- IPS panel for wide viewing angles
- USB-C connectivity with power delivery
- Color accurate (sRGB 99%+) for design work
- Adjustable stand (height, tilt, pivot)
- VESA mount compatible

Benefits:
- Significantly improve productivity with dual monitor setup
- Better for code review and debugging
- Enhanced multitasking
- Professional design and video editing`,
    purchaseDate: null
  },
  {
    name: 'Mechanical Keyboard (Developer Edition)',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 90000, // 90,000 XAF (~$150)
    currency: 'XAF',
    location: 'Office',
    notes: `Ergonomic mechanical keyboard for development.

Target specifications:
- Full-size or TKL layout
- Cherry MX Brown or equivalent tactile switches
- Programmable keys/macros
- Backlit RGB (optional)
- USB-C connectivity
- Durable build quality

Benefits:
- Reduce typing fatigue
- Faster, more accurate typing
- Better ergonomics for long coding sessions
- Customizable for development workflow`,
    purchaseDate: null
  },
  {
    name: 'Webcam HD 1080p',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 60000, // 60,000 XAF (~$100)
    currency: 'XAF',
    location: 'Office',
    notes: `High-quality webcam for video meetings.

Target specifications:
- 1080p Full HD resolution
- Auto-focus
- Built-in microphone with noise reduction
- Wide-angle lens (78-90 degrees)
- USB plug-and-play

Use cases:
- Remote client meetings
- Team video calls
- Online presentations
- Recording tutorials/demos`,
    purchaseDate: null
  },
  {
    name: 'External SSD 2TB (Portable)',
    assetType: 'technology',
    acquisitionStatus: 'target',
    status: 'planning',
    condition: 100,
    purchaseCost: 120000, // 120,000 XAF (~$200)
    currency: 'XAF',
    location: 'Office',
    notes: `Portable external SSD for backups and transfers.

Target specifications:
- 2TB capacity
- USB 3.2 Gen 2 (10Gbps) or Thunderbolt
- Rugged/shock-resistant design
- Encryption support
- Compact and portable

Use cases:
- Emergency backups
- Large file transfers
- Portable project storage
- Archive important data`,
    purchaseDate: null
  }
];

async function addAssets() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully');

    // Get generals
    const generals = await General.findAll({
      order: [['orderNumber', 'ASC']]
    });

    console.log('\n=== GENERALS ===');
    generals.forEach(g => {
      console.log(`${g.orderNumber}. ${g.name} (ID: ${g.id})`);
      console.log(`   Description: ${g.description || 'N/A'}`);
    });

    const general0 = generals.find(g => g.orderNumber === 0);
    if (!general0) {
      console.error('\n✗ General 0 not found!');
      process.exit(1);
    }

    console.log(`\n✓ Found General 0: ${general0.name} (ID: ${general0.id})`);

    // Add generalId to all assets
    const assetsWithGeneral = assetsToAdd.map(asset => ({
      ...asset,
      generalId: general0.id
    }));

    console.log(`\n📦 Adding ${assetsWithGeneral.length} assets...`);

    let acquiredCount = 0;
    let targetCount = 0;

    for (const asset of assetsWithGeneral) {
      await PhysicalAsset.create(asset);

      if (asset.acquisitionStatus === 'acquired') {
        acquiredCount++;
        console.log(`  ✓ ACQUIRED: ${asset.name} (${(asset.purchaseCost / 1000).toFixed(0)}K XAF)`);
      } else {
        targetCount++;
        console.log(`  → TARGET: ${asset.name} (${(asset.purchaseCost / 1000).toFixed(0)}K XAF)`);
      }
    }

    console.log(`\n✅ Successfully added ${assetsWithGeneral.length} assets:`);
    console.log(`  - ${acquiredCount} ACQUIRED assets (already owned)`);
    console.log(`  - ${targetCount} TARGET assets (to be acquired)`);

    const totalAcquired = assetsWithGeneral
      .filter(a => a.acquisitionStatus === 'acquired')
      .reduce((sum, a) => sum + a.purchaseCost, 0);

    const totalTarget = assetsWithGeneral
      .filter(a => a.acquisitionStatus === 'target')
      .reduce((sum, a) => sum + a.purchaseCost, 0);

    console.log(`\n💰 Asset Value Summary:`);
    console.log(`  - Total ACQUIRED value: ${(totalAcquired / 1000000).toFixed(2)} Million XAF`);
    console.log(`  - Total TARGET investment needed: ${(totalTarget / 1000000).toFixed(2)} Million XAF`);
    console.log(`  - GRAND TOTAL: ${((totalAcquired + totalTarget) / 1000000).toFixed(2)} Million XAF`);

    await sequelize.close();
    console.log('\n✓ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await sequelize.close();
    process.exit(1);
  }
}

addAssets();
