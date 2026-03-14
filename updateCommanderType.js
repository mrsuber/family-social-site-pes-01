require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const Person = require('./models/Person');

const updateCommanderType = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Find Mohammad Siysinyuy and update his relationship type
    const updated = await Person.update(
      { relationshipType: 'high_commander' },
      {
        where: {
          fullName: 'Mohamad Siysinyuy'
        }
      }
    );

    if (updated[0] > 0) {
      console.log('✅ Successfully updated Mohamad Siysinyuy to high_commander');

      // Verify the update
      const person = await Person.findOne({
        where: { fullName: 'Mohamad Siysinyuy' }
      });

      console.log('Updated person:', {
        name: person.fullName,
        relationshipType: person.relationshipType,
        title: person.title
      });
    } else {
      console.log('❌ No person found with name "Mohamad Siysinyuy"');

      // Show similar names to help debug
      const allPeople = await Person.findAll({
        attributes: ['fullName', 'relationshipType', 'title'],
        limit: 10
      });
      console.log('\nExisting people in database:');
      allPeople.forEach(p => {
        console.log(`- ${p.fullName} (${p.relationshipType}) - ${p.title}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateCommanderType();
