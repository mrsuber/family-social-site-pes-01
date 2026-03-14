require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const MissionControlNode = require('./models/MissionControlNode');

async function syncDatabase() {
  try {
    await connectDB();
    console.log('🔧 Syncing Mission Control Nodes table...\n');

    // Create mission_control_nodes table
    await MissionControlNode.sync({ alter: true });

    console.log('✅ Mission control nodes table synced successfully!');
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
}

syncDatabase();
