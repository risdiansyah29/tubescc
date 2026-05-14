const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Models
const Transaction = require('./models/Transaction');
const Savings = require('./models/Savings');
const User = require('./models/User');

// Associations
User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Savings, { foreignKey: 'userId', onDelete: 'CASCADE' });
Savings.belongsTo(User, { foreignKey: 'userId' });

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');
const savingsRoutes = require('./routes/savingsRoutes');

app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/savings', savingsRoutes);

app.get('/', (req, res) => {
  res.send('Financial System API is running...');
});

// Sync Database & Start Server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
