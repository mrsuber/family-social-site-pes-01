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

// Import new Resource Management models
require('./models/General');
require('./models/Person');
require('./models/Skill');
require('./models/PersonSkill');
require('./models/Experience');
require('./models/Education');
require('./models/Language');
require('./models/PhysicalAsset');
require('./models/CompanyLoan');
require('./models/SickLeave');
require('./models/Project');
require('./models/ProjectAssignment');

const syncResourceManagement = async () => {
  try {
    await connectDB();
    console.log('🚀 Syncing Resource Management System tables...');

    // Sync all models with database
    await sequelize.sync({ alter: true });

    console.log('✅ Resource Management System tables synced successfully!');
    console.log('\n📊 Tables created:');
    console.log('   - generals (4 generals structure)');
    console.log('   - people (human resources & connections)');
    console.log('   - skills (skills catalog)');
    console.log('   - person_skills (proficiency tracking)');
    console.log('   - experiences (work history)');
    console.log('   - education (academic credentials)');
    console.log('   - languages (language proficiencies)');
    console.log('   - physical_assets (cars, machines, hardware)');
    console.log('   - company_loans (loan tracking)');
    console.log('   - sick_leaves (sick leave records)');
    console.log('   - projects (general projects)');
    console.log('   - project_assignments (who works on what)');
    console.log('\n🎯 Ready for Mission Control!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
};

syncResourceManagement();
