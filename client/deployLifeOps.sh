#!/bin/bash

echo "========================================="
echo "Deploying Life Operations System"
echo "========================================="

VPS_HOST="root@148.230.118.19"
VPS_DIR="/root/family-social"

echo ""
echo "Step 1: Deploying Models..."
echo "----------------------------------------"

# Deploy all Life Operations models
scp models/IncomeStream.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/Expense.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/TimeBlock.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/LearningInvestment.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/Connection.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/Conversation.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/Gift.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/DailyLog.js ${VPS_HOST}:${VPS_DIR}/models/
scp models/WeeklyPlan.js ${VPS_HOST}:${VPS_DIR}/models/

echo "✓ Models deployed"

echo ""
echo "Step 2: Deploying Controllers..."
echo "----------------------------------------"

# Deploy controllers
scp controllers/lifeOpsCtrl.js ${VPS_HOST}:${VPS_DIR}/controllers/
scp controllers/connectionCtrl.js ${VPS_HOST}:${VPS_DIR}/controllers/

echo "✓ Controllers deployed"

echo ""
echo "Step 3: Deploying Routes..."
echo "----------------------------------------"

# Deploy routes
scp routes/lifeOpsRoutes.js ${VPS_HOST}:${VPS_DIR}/routes/
scp routes/connectionRoutes.js ${VPS_HOST}:${VPS_DIR}/routes/

echo "✓ Routes deployed"

echo ""
echo "Step 4: Updating Server Routes Configuration..."
echo "----------------------------------------"

# Create a script to update server.js with new routes
ssh ${VPS_HOST} "cd ${VPS_DIR} && cat >> server.js << 'ROUTES_EOF'

// Life Operations Routes
const lifeOpsRoutes = require('./routes/lifeOpsRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

app.use('/api/life-ops', lifeOpsRoutes);
app.use('/api/connections', connectionRoutes);
ROUTES_EOF
"

echo "✓ Server routes updated"

echo ""
echo "Step 5: Creating Database Sync Script..."
echo "----------------------------------------"

# Create sync script on VPS
ssh ${VPS_HOST} "cd ${VPS_DIR} && cat > syncLifeOpsDatabase.js << 'SYNC_EOF'
require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');

// Import all existing models
require('./models/User');
require('./models/postModel');
require('./models/commentModel');
require('./models/messageModal');
require('./models/conversationModel');
require('./models/notifyModel');
require('./models/schoolModel');
require('./models/familyModel');
require('./models/familyMemberModel');
require('./models/Recipe');
require('./models/Statistics');
require('./models/companyDescriptionModel');
require('./models/computerEngineeringModel');
require('./models/religiousStutiesModel');

// Import new Life Operations models
require('./models/IncomeStream');
require('./models/Expense');
require('./models/TimeBlock');
require('./models/LearningInvestment');
require('./models/Connection');
require('./models/Conversation');
require('./models/Gift');
require('./models/DailyLog');
require('./models/WeeklyPlan');

const syncDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    console.log('Syncing Life Operations models...');

    // Sync with alter to add new tables without dropping existing ones
    await sequelize.sync({ force: false, alter: true });

    console.log('✅ Life Operations database synced successfully!');
    console.log('');
    console.log('New tables created:');
    console.log('  - IncomeStreams (income tracking)');
    console.log('  - Expenses (expense tracking with categories)');
    console.log('  - TimeBlocks (time allocation tracking)');
    console.log('  - LearningInvestments (skill investment ROI)');
    console.log('  - Connections (personal CRM)');
    console.log('  - Conversations (conversation history)');
    console.log('  - Gifts (gift tracking)');
    console.log('  - DailyLogs (daily operations summary)');
    console.log('  - WeeklyPlans (weekly planning)');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
};

syncDatabase();
SYNC_EOF
"

echo "✓ Database sync script created"

echo ""
echo "Step 6: Installing Dependencies (if needed)..."
echo "----------------------------------------"

ssh ${VPS_HOST} "cd ${VPS_DIR} && npm install"

echo "✓ Dependencies checked"

echo ""
echo "Step 7: Syncing Database (Creating New Tables)..."
echo "----------------------------------------"

ssh ${VPS_HOST} "cd ${VPS_DIR} && node syncLifeOpsDatabase.js"

echo ""
echo "Step 8: Restarting Server..."
echo "----------------------------------------"

ssh ${VPS_HOST} "cd ${VPS_DIR} && pm2 restart family-social || pm2 start server.js --name family-social"

echo "✓ Server restarted"

echo ""
echo "========================================="
echo "✓ Life Operations System Deployed!"
echo "========================================="
echo ""
echo "Available API Endpoints:"
echo ""
echo "Financial:"
echo "  GET    /api/life-ops/income/:personId"
echo "  POST   /api/life-ops/income"
echo "  GET    /api/life-ops/expenses/:personId"
echo "  POST   /api/life-ops/expenses"
echo "  GET    /api/life-ops/financial-dashboard/:personId"
echo ""
echo "Time & Learning:"
echo "  GET    /api/life-ops/time-blocks/:personId"
echo "  POST   /api/life-ops/time-blocks"
echo "  GET    /api/life-ops/learning/:personId"
echo "  POST   /api/life-ops/learning"
echo ""
echo "Daily Operations:"
echo "  GET    /api/life-ops/daily-logs/:personId"
echo "  POST   /api/life-ops/daily-logs"
echo "  GET    /api/life-ops/weekly-plans/:personId"
echo "  POST   /api/life-ops/weekly-plans"
echo ""
echo "Connection Manager:"
echo "  GET    /api/connections/connections/:personId"
echo "  POST   /api/connections/connections"
echo "  GET    /api/connections/conversations/:connectionId"
echo "  POST   /api/connections/conversations"
echo "  GET    /api/connections/gifts/:connectionId"
echo "  POST   /api/connections/gifts"
echo ""
echo "========================================="
