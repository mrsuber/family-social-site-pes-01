const { Sequelize } = require('sequelize');
require('dotenv').config();

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
const Person = require('../models/Person');
const Department = require('../models/Department');
const Project = require('../models/Project');

async function showMissionStructure() {
  try {
    await sequelize.authenticate();

    const generals = await General.findAll({ order: [['orderNumber', 'ASC']] });
    const people = await Person.findAll({ where: { status: 'active' }, order: [['fullName', 'ASC']] });
    const departments = await Department.findAll({ where: { status: 'active' }, order: [['generalId', 'ASC'], ['orderNumber', 'ASC']] });
    const projects = await Project.findAll({ where: { status: 'active' }, order: [['name', 'ASC']] });

    console.log('\n🎖️  GENERALS (Command Structure):');
    console.log('═'.repeat(80));
    generals.forEach(g => {
      console.log(`\n[${g.orderNumber}] ${g.name}`);
      console.log(`    Status: ${g.status}`);
      if (g.description) {
        const desc = typeof g.description === 'string' ? g.description : JSON.stringify(g.description);
        console.log(`    Mission: ${desc.substring(0, 100)}...`);
      }
      if (g.objectives) {
        const obj = typeof g.objectives === 'string' ? g.objectives : JSON.stringify(g.objectives);
        console.log(`    Objectives: ${obj.substring(0, 100)}...`);
      }
    });

    console.log('\n\n👥 PEOPLE (Managers & Team):');
    console.log('═'.repeat(80));
    people.forEach(p => {
      console.log(`\n✓ ${p.fullName} - ${p.title || 'No title'}`);
      console.log(`  Relationship: ${p.relationshipType || 'N/A'}`);
      if (p.performanceRating) console.log(`  Performance: ${p.performanceRating}/5`);
      console.log(`  Email: ${p.email || 'N/A'}`);
    });

    console.log('\n\n🏢 DEPARTMENTS:');
    console.log('═'.repeat(80));
    departments.forEach(d => {
      console.log(`\n📁 ${d.name}`);
      if (d.description) {
        const desc = typeof d.description === 'string' ? d.description : JSON.stringify(d.description);
        console.log(`   Mission: ${desc.substring(0, 100)}`);
      }
      if (d.objectives) {
        const obj = typeof d.objectives === 'string' ? d.objectives : JSON.stringify(d.objectives);
        console.log(`   Objectives: ${obj.substring(0, 80)}...`);
      }
    });

    console.log('\n\n🚀 ACTIVE PROJECTS:');
    console.log('═'.repeat(80));
    projects.forEach(p => {
      console.log(`\n🎯 ${p.name}`);
      console.log(`   Status: ${p.status}`);
      if (p.description) {
        const desc = typeof p.description === 'string' ? p.description : JSON.stringify(p.description);
        console.log(`   Description: ${desc.substring(0, 150)}...`);
      }
    });

    console.log(`\n\n📊 MISSION SUMMARY:`);
    console.log('═'.repeat(80));
    console.log(`  🎖️  Generals: ${generals.length}`);
    console.log(`  👥 Active People: ${people.length}`);
    console.log(`  🏢 Active Departments: ${departments.length}`);
    console.log(`  🚀 Active Projects: ${projects.length}`);
    console.log(`\n  🌟 ULTIMATE MISSION: TRAVEL THE STARS\n`);

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await sequelize.close();
    process.exit(1);
  }
}

showMissionStructure();
