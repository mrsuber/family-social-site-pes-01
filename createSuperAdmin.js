require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');
const User = require('./models/User');

const createSuperAdmin = async () => {
  try {
    // Connect to PostgreSQL
    await connectDB();

    const email = 'msiysinyuy@gmail.com';
    const password = 'Msb1@@@@';
    const username = 'msiysinyuy';
    const fullname = 'Mohamad Siysinyuy';

    // Check if superadmin already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log('Updating existing user to superadmin...');
      existingUser.isSuperAdmin = true;
      existingUser.isAdmin = true;
      existingUser.role = 'superadmin';
      existingUser.password = password;
      await existingUser.save();
      console.log('✅ User updated to superadmin successfully!');
    } else {
      console.log('Creating new superadmin user...');
      const user = await User.create({
        fullname,
        username,
        email,
        password,
        isSuperAdmin: true,
        isAdmin: true,
        role: 'superadmin'
      });
      console.log('✅ Superadmin user created successfully!');
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  SuperAdmin Details');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:    ', email);
    console.log('Username: ', username);
    console.log('Password: ', password);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nPlease login with these credentials.');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating superadmin:', error.message);
    console.error(error);
    process.exit(1);
  }
};

createSuperAdmin();
