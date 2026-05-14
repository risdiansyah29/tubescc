const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Savings = sequelize.define('Savings', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  goalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  targetAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  currentAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  deadline: {
    type: DataTypes.DATE
  }
});

module.exports = Savings;
