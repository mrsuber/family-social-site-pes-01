require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const MissionControlNode = require('./models/MissionControlNode');
const GlobalAsset = require('./models/GlobalAsset');

async function syncDatabase() {
  try {
    await connectDB();
    console.log('🔧 Syncing database tables...\n');

    // Create mission_control_nodes table
    console.log('Syncing mission_control_nodes...');
    await MissionControlNode.sync({ alter: true });
    console.log('✅ Mission control nodes table synced!');

    // Create global_assets table
    console.log('\nSyncing global_assets...');
    await GlobalAsset.sync({ alter: true });
    console.log('✅ Global assets table synced!');

    console.log('\n' + '='.repeat(50));
    console.log('✅ All tables synced successfully!');
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
}

syncDatabase();
