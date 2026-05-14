const User = require('../models/User');

async function checkUsers() {
  try {
    const users = await User.findAll({ attributes: ['username'] });
    console.log('Registered Users:', users.map(u => u.username));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
