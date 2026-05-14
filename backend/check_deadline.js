const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

async function run() {
  try {
    const [results] = await sequelize.query("PRAGMA table_info(Savings)");
    console.log("COLUMNS:");
    results.forEach(c => console.log(`- ${c.name}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
