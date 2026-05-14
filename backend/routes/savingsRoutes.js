const express = require('express');
const router = express.Router();
const { createSaving, getSavings, updateSavingAmount, deleteSaving } = require('../controllers/savingsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createSaving);
router.get('/', getSavings);
router.patch('/:id/add', updateSavingAmount);
router.delete('/:id', deleteSaving);

module.exports = router;
