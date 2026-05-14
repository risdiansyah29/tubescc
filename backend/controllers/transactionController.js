const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');

// Create Transaction
exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, description } = req.body;
    const transaction = await Transaction.create({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
      description,
      userId: req.user.id
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ 
      where: { userId: req.user.id },
      order: [['date', 'DESC']] 
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Summary
exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id }
    });
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += parseFloat(t.amount);
      else totalExpense += parseFloat(t.amount);
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ 
      where: { id, userId: req.user.id } 
    });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
