const Savings = require('../models/Savings');
const Transaction = require('../models/Transaction');

exports.createSaving = async (req, res) => {
  try {
    const { goalName, targetAmount, deadline } = req.body;
    const saving = await Savings.create({
      goalName,
      targetAmount: parseFloat(targetAmount),
      deadline,
      userId: req.user.id
    });
    res.status(201).json(saving);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const savings = await Savings.findAll({
      where: { userId: req.user.id }
    });
    res.json(savings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSavingAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body; // amount to add
    const saving = await Savings.findOne({
      where: { id, userId: req.user.id }
    });
    if (!saving) return res.status(404).json({ error: 'Saving goal not found' });

    saving.currentAmount = parseFloat(saving.currentAmount) + parseFloat(amount);
    await saving.save();

    // Create a transaction to reflect the balance decrease
    await Transaction.create({
      title: `Tabungan: ${saving.goalName}`,
      amount: amount,
      type: 'expense',
      category: 'Savings',
      date: new Date(),
      userId: req.user.id
    });

    res.json(saving);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSaving = async (req, res) => {
  try {
    const { id } = req.params;
    await Savings.destroy({ 
      where: { id, userId: req.user.id } 
    });
    res.json({ message: 'Saving goal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
