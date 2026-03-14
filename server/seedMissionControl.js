require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const General = require('./models/General');
const Person = require('./models/Person');
const PhysicalAsset = require('./models/PhysicalAsset');

// Random name generators
const firstNames = [
  'James', 'Michael', 'Robert', 'Maria', 'Jennifer', 'Linda', 'Patricia', 'Elizabeth',
  'Sarah', 'Jessica', 'Ashley', 'Emily', 'Hannah', 'Samantha', 'Madison', 'Taylor',
  'Olivia', 'Emma', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper',
  'David', 'John', 'Daniel', 'Matthew', 'Christopher', 'Andrew', 'Joshua', 'Ryan',
  'Nicholas', 'Brandon', 'Tyler', 'Jacob', 'Alexander', 'William', 'Benjamin', 'Samuel',
  'Kwame', 'Ama', 'Kofi', 'Abena', 'Yaw', 'Akua', 'Adjoa', 'Afua', 'Kwabena', 'Ekua'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark',
  'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott',
  'Mensah', 'Asante', 'Osei', 'Boateng', 'Owusu', 'Agyeman', 'Appiah', 'Nkrumah'
];

function getRandomName() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

function getRandomPerformance() {
  return Math.floor(Math.random() * 40) + 60; // 60-100
}

// SuberCraftex (Technology/Software) - General 1
const suberCraftexPeople = {
  acquired: [
    { title: 'Chief Technology Officer', relationshipType: 'employee' },
    { title: 'Senior Full Stack Developer', relationshipType: 'employee' },
    { title: 'DevOps Engineer', relationshipType: 'employee' },
    { title: 'UI/UX Designer', relationshipType: 'employee' },
    { title: 'Frontend Developer', relationshipType: 'employee' },
    { title: 'Backend Developer', relationshipType: 'employee' },
    { title: 'QA Test Engineer', relationshipType: 'employee' },
    { title: 'Product Manager', relationshipType: 'employee' },
    { title: 'Junior Developer', relationshipType: 'employee' },
    { title: 'Marketing Director', relationshipType: 'business_contact' },
  ],
  targets: [
    { title: 'Senior AI/ML Engineer', relationshipType: 'employee' },
    { title: 'Blockchain Developer', relationshipType: 'employee' },
    { title: 'Mobile App Developer', relationshipType: 'employee' },
    { title: 'Data Scientist', relationshipType: 'employee' },
    { title: 'Executive Assistant', relationshipType: 'girlfriend_candidate' },
  ]
};

const suberCraftexAssets = {
  acquired: [
    { name: 'AWS Cloud Infrastructure', description: 'Production hosting and development environments', value: 15000 },
    { name: 'GitHub Enterprise License', description: 'Version control and collaboration platform', value: 2500 },
    { name: 'MacBook Pro (Dev Team)', description: '5x MacBook Pro M3 Max for development team', value: 20000 },
    { name: 'Office Space Lease', description: 'Co-working space for 10 people', value: 5000 },
    { name: 'Figma Team License', description: 'Design collaboration tool', value: 1200 },
    { name: 'Jira & Confluence', description: 'Project management and documentation', value: 800 },
  ],
  targets: [
    { name: 'Dell PowerEdge R750 Server', description: 'On-premise server for sensitive data', value: 12000 },
    { name: 'Dedicated Office Space', description: 'Private office for 15 people in tech hub', value: 8000 },
    { name: 'AI GPU Cluster', description: 'NVIDIA A100 GPUs for ML training', value: 45000 },
    { name: 'Cybersecurity Suite', description: 'Enterprise security monitoring and protection', value: 6000 },
  ]
};

// Government & Finance - General 2
const govFinancePeople = {
  acquired: [
    { title: 'Chief Financial Officer', relationshipType: 'employee' },
    { title: 'Government Contracts Manager', relationshipType: 'employee' },
    { title: 'Senior Accountant', relationshipType: 'employee' },
    { title: 'Financial Analyst', relationshipType: 'employee' },
    { title: 'Compliance Officer', relationshipType: 'employee' },
    { title: 'Tax Specialist', relationshipType: 'employee' },
    { title: 'Budget Coordinator', relationshipType: 'employee' },
    { title: 'Government Liaison', relationshipType: 'business_contact' },
  ],
  targets: [
    { title: 'Investment Banker', relationshipType: 'business_contact' },
    { title: 'Corporate Attorney', relationshipType: 'employee' },
    { title: 'Risk Management Specialist', relationshipType: 'employee' },
    { title: 'Grant Writer', relationshipType: 'employee' },
    { title: 'Chief Compliance Officer', relationshipType: 'employee' },
  ]
};

const govFinanceAssets = {
  acquired: [
    { name: 'QuickBooks Enterprise', description: 'Advanced accounting software', value: 2000 },
    { name: 'Government Contract Portfolio', description: 'Active contracts worth $500K annually', value: 500000 },
    { name: 'Business Banking Account', description: 'Commercial account with $100K line of credit', value: 100000 },
    { name: 'Legal Retainer', description: 'Annual legal services retainer', value: 15000 },
    { name: 'Professional Indemnity Insurance', description: 'PI insurance coverage', value: 8000 },
  ],
  targets: [
    { name: 'Bloomberg Terminal', description: 'Financial data and trading platform', value: 24000 },
    { name: 'Government Security Clearance', description: 'Secret clearance for team members', value: 5000 },
    { name: 'Investment Portfolio', description: 'Diversified investment fund', value: 250000 },
    { name: 'Corporate Bonds', description: 'Low-risk government bonds', value: 150000 },
  ]
};

// Farm Operations - General 3
const farmPeople = {
  acquired: [
    { title: 'Farm Manager', relationshipType: 'employee' },
    { title: 'Agricultural Engineer', relationshipType: 'employee' },
    { title: 'Livestock Supervisor', relationshipType: 'employee' },
    { title: 'Crop Specialist', relationshipType: 'employee' },
    { title: 'Equipment Operator', relationshipType: 'employee' },
    { title: 'Farm Hand', relationshipType: 'employee' },
    { title: 'Veterinarian (Contract)', relationshipType: 'business_contact' },
    { title: 'Farm Accountant', relationshipType: 'employee' },
  ],
  targets: [
    { title: 'Sustainable Agriculture Specialist', relationshipType: 'employee' },
    { title: 'Irrigation Engineer', relationshipType: 'employee' },
    { title: 'Agribusiness Consultant', relationshipType: 'business_contact' },
    { title: 'Organic Certification Specialist', relationshipType: 'business_contact' },
    { title: 'Farm Equipment Mechanic', relationshipType: 'employee' },
  ]
};

const farmAssets = {
  acquired: [
    { name: '50 Acre Farmland', description: 'Prime agricultural land with irrigation', value: 350000 },
    { name: 'John Deere 6155R Tractor', description: '155HP utility tractor', value: 85000 },
    { name: 'Greenhouse Complex', description: '5,000 sq ft climate-controlled greenhouses', value: 75000 },
    { name: 'Livestock (50 Cattle)', description: 'Mixed dairy and beef cattle', value: 60000 },
    { name: 'Irrigation System', description: 'Automated drip irrigation for 30 acres', value: 25000 },
    { name: 'Storage Barn', description: 'Equipment and produce storage facility', value: 40000 },
  ],
  targets: [
    { name: 'Solar Panel Array', description: '100kW solar installation for farm operations', value: 120000 },
    { name: 'Cold Storage Facility', description: 'Refrigerated storage for produce', value: 95000 },
    { name: 'Combine Harvester', description: 'New Holland CR8.90 combine', value: 450000 },
    { name: 'Additional 100 Acres', description: 'Adjacent farmland for expansion', value: 650000 },
    { name: 'Farm-to-Table Distribution Van', description: 'Refrigerated delivery vehicle', value: 45000 },
  ]
};

// R&D (Research & Development) - General 4
const rndPeople = {
  acquired: [
    { title: 'Chief Research Officer', relationshipType: 'employee' },
    { title: 'Senior Research Scientist', relationshipType: 'employee' },
    { title: 'Materials Engineer', relationshipType: 'employee' },
    { title: 'Laboratory Technician', relationshipType: 'employee' },
    { title: 'Data Analyst', relationshipType: 'employee' },
    { title: 'Research Assistant', relationshipType: 'employee' },
    { title: 'Patent Attorney', relationshipType: 'business_contact' },
  ],
  targets: [
    { title: 'Aerospace Engineer', relationshipType: 'employee' },
    { title: 'PhD Physicist', relationshipType: 'employee' },
    { title: 'Propulsion Specialist', relationshipType: 'employee' },
    { title: 'Systems Integration Engineer', relationshipType: 'employee' },
    { title: 'Chief Innovation Officer', relationshipType: 'employee' },
    { title: 'Research Partner (NASA)', relationshipType: 'business_contact' },
  ]
};

const rndAssets = {
  acquired: [
    { name: 'Research Laboratory', description: '3,000 sq ft equipped research facility', value: 150000 },
    { name: '3D Printing Lab', description: 'Industrial 3D printers and CNC machines', value: 65000 },
    { name: 'Testing Equipment', description: 'Stress testing and materials analysis equipment', value: 45000 },
    { name: 'Patent Portfolio', description: '5 filed patents in aerospace technology', value: 200000 },
    { name: 'Research Compute Cluster', description: 'HPC cluster for simulations', value: 35000 },
  ],
  targets: [
    { name: 'Wind Tunnel Facility', description: 'Subsonic wind tunnel for aerodynamic testing', value: 850000 },
    { name: 'Clean Room Lab', description: 'ISO Class 7 clean room for sensitive assembly', value: 250000 },
    { name: 'Electron Microscope', description: 'Scanning electron microscope for materials research', value: 180000 },
    { name: 'Prototype Spacecraft Component', description: 'Initial propulsion system prototype', value: 500000 },
    { name: 'Research Grant Funding', description: 'Government research grant', value: 1000000 },
  ]
};

async function seedMissionControl() {
  try {
    await connectDB();
    console.log('🚀 Starting Mission Control seed...\n');

    // Get all generals
    const generals = await General.findAll({ order: [['orderNumber', 'ASC']] });

    if (generals.length !== 4) {
      console.log('❌ Error: Expected 4 generals, found', generals.length);
      console.log('Please run the generals seed first!');
      process.exit(1);
    }

    const [suberCraftex, govFinance, farm, rnd] = generals;

    // Clear existing mission control data (keep existing people, only clear mission control assets)
    console.log('🗑️  Clearing existing mission control assets...');
    await PhysicalAsset.destroy({
      where: {
        generalId: [suberCraftex.id, govFinance.id, farm.id, rnd.id]
      }
    });

    let totalPeople = 0;
    let totalAssets = 0;

    // Seed SuberCraftex
    console.log('\n📱 Seeding SuberCraftex (Technology)...');
    for (const person of suberCraftexPeople.acquired) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: suberCraftex.id,
        relationshipType: person.relationshipType,
        status: 'acquired',
        performanceRating: getRandomPerformance(),
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const person of suberCraftexPeople.targets) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: suberCraftex.id,
        relationshipType: person.relationshipType,
        status: 'target',
        performanceRating: null,
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const asset of suberCraftexAssets.acquired) {
      await PhysicalAsset.create({
        assetType: 'technology',
        name: asset.name,
        generalId: suberCraftex.id,
        status: 'working',
        purchaseCost: asset.value,
        purchaseDate: new Date(),
        condition: 95,
        notes: asset.description,
      });
      totalAssets++;
    }
    for (const asset of suberCraftexAssets.targets) {
      await PhysicalAsset.create({
        assetType: 'technology',
        name: asset.name,
        generalId: suberCraftex.id,
        status: 'working',
        purchaseCost: asset.value,
        condition: 100,
        notes: `TARGET TO ACQUIRE: ${asset.description}`,
      });
      totalAssets++;
    }
    console.log(`✅ Added ${suberCraftexPeople.acquired.length + suberCraftexPeople.targets.length} people, ${suberCraftexAssets.acquired.length + suberCraftexAssets.targets.length} assets`);

    // Seed Government & Finance
    console.log('\n🏛️  Seeding Government & Finance...');
    for (const person of govFinancePeople.acquired) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: govFinance.id,
        relationshipType: person.relationshipType,
        status: 'acquired',
        performanceRating: getRandomPerformance(),
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const person of govFinancePeople.targets) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: govFinance.id,
        relationshipType: person.relationshipType,
        status: 'target',
        performanceRating: null,
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const asset of govFinanceAssets.acquired) {
      await PhysicalAsset.create({
        assetType: 'financial',
        name: asset.name,
        generalId: govFinance.id,
        status: 'working',
        purchaseCost: asset.value,
        purchaseDate: new Date(),
        condition: 95,
        notes: asset.description,
      });
      totalAssets++;
    }
    for (const asset of govFinanceAssets.targets) {
      await PhysicalAsset.create({
        assetType: 'financial',
        name: asset.name,
        generalId: govFinance.id,
        status: 'working',
        purchaseCost: asset.value,
        condition: 100,
        notes: `TARGET TO ACQUIRE: ${asset.description}`,
      });
      totalAssets++;
    }
    console.log(`✅ Added ${govFinancePeople.acquired.length + govFinancePeople.targets.length} people, ${govFinanceAssets.acquired.length + govFinanceAssets.targets.length} assets`);

    // Seed Farm
    console.log('\n🌾 Seeding Farm Operations...');
    for (const person of farmPeople.acquired) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: farm.id,
        relationshipType: person.relationshipType,
        status: 'acquired',
        performanceRating: getRandomPerformance(),
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const person of farmPeople.targets) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: farm.id,
        relationshipType: person.relationshipType,
        status: 'target',
        performanceRating: null,
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const asset of farmAssets.acquired) {
      await PhysicalAsset.create({
        assetType: 'equipment',
        name: asset.name,
        generalId: farm.id,
        status: 'working',
        purchaseCost: asset.value,
        purchaseDate: new Date(),
        condition: 90,
        notes: asset.description,
      });
      totalAssets++;
    }
    for (const asset of farmAssets.targets) {
      await PhysicalAsset.create({
        assetType: 'equipment',
        name: asset.name,
        generalId: farm.id,
        status: 'working',
        purchaseCost: asset.value,
        condition: 100,
        notes: `TARGET TO ACQUIRE: ${asset.description}`,
      });
      totalAssets++;
    }
    console.log(`✅ Added ${farmPeople.acquired.length + farmPeople.targets.length} people, ${farmAssets.acquired.length + farmAssets.targets.length} assets`);

    // Seed R&D
    console.log('\n🔬 Seeding Research & Development...');
    for (const person of rndPeople.acquired) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: rnd.id,
        relationshipType: person.relationshipType,
        status: 'acquired',
        performanceRating: getRandomPerformance(),
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const person of rndPeople.targets) {
      await Person.create({
        fullName: getRandomName(),
        title: person.title,
        generalId: rnd.id,
        relationshipType: person.relationshipType,
        status: 'target',
        performanceRating: null,
        photoUrl: null,
      });
      totalPeople++;
    }
    for (const asset of rndAssets.acquired) {
      await PhysicalAsset.create({
        assetType: 'research',
        name: asset.name,
        generalId: rnd.id,
        status: 'working',
        purchaseCost: asset.value,
        purchaseDate: new Date(),
        condition: 93,
        notes: asset.description,
      });
      totalAssets++;
    }
    for (const asset of rndAssets.targets) {
      await PhysicalAsset.create({
        assetType: 'research',
        name: asset.name,
        generalId: rnd.id,
        status: 'working',
        purchaseCost: asset.value,
        condition: 100,
        notes: `TARGET TO ACQUIRE: ${asset.description}`,
      });
      totalAssets++;
    }
    console.log(`✅ Added ${rndPeople.acquired.length + rndPeople.targets.length} people, ${rndAssets.acquired.length + rndAssets.targets.length} assets`);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ Mission Control Seeding Complete!');
    console.log('='.repeat(50));
    console.log(`👥 Total People: ${totalPeople}`);
    console.log(`💰 Total Assets: ${totalAssets}`);
    console.log('\n📊 Breakdown:');
    console.log(`   SuberCraftex: ${suberCraftexPeople.acquired.length + suberCraftexPeople.targets.length} people, ${suberCraftexAssets.acquired.length + suberCraftexAssets.targets.length} assets`);
    console.log(`   Gov & Finance: ${govFinancePeople.acquired.length + govFinancePeople.targets.length} people, ${govFinanceAssets.acquired.length + govFinanceAssets.targets.length} assets`);
    console.log(`   Farm: ${farmPeople.acquired.length + farmPeople.targets.length} people, ${farmAssets.acquired.length + farmAssets.targets.length} assets`);
    console.log(`   R&D: ${rndPeople.acquired.length + rndPeople.targets.length} people, ${rndAssets.acquired.length + rndAssets.targets.length} assets`);
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding mission control:', error);
    process.exit(1);
  }
}

seedMissionControl();
