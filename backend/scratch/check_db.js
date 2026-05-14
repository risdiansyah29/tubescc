const sequelize = require('../config/db');
const Transaction = require('../models/Transaction');

async function check() {
  try {
    console.log('Transactions Table:');
    const transInfo = await sequelize.getQueryInterface().describeTable('Transactions');
    console.log(JSON.stringify(transInfo, null, 2));
    
    console.log('\nSavings Table:');
    const savingsInfo = await sequelize.getQueryInterface().describeTable('Savings');
    console.log(JSON.stringify(savingsInfo, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
