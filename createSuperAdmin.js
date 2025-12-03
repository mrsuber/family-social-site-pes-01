require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');

    const email = 'mohamad.siysinyuy@gmail.com';
    const password = 'Msb1@@@@';
    const username = 'superadmin';
    const fullname = 'Super Admin';

    // Check if superadmin already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Updating existing user to superadmin...');
      existingUser.isSuperAdmin = true;
      existingUser.isAdmin = true;
      existingUser.role = 'superadmin';
      if (password) {
        existingUser.password = password;
      }
      await existingUser.save();
      console.log('User updated to superadmin successfully!');
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
      console.log('Superadmin user created successfully!');
    }

    console.log('\nSuperadmin Details:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\nPlease login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('Error creating superadmin:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();
