const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, getSummary, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/summary', getSummary);
router.delete('/:id', deleteTransaction);

module.exports = router;
