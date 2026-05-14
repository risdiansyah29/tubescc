const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id)
    });
  } catch (err) {
    let message = err.message;
    if (err.name === 'SequelizeUniqueConstraintError') {
      message = 'Username already exists';
    }
    res.status(400).json({ error: message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && (await user.comparePassword(password))) {
      res.json({
        id: user.id,
        username: user.username,
        token: generateToken(user.id)
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
