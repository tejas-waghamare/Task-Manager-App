const express = require('express');
const {
  getManagerStats,
  getEmployeeStats,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/manager', getManagerStats);
router.get('/employee', getEmployeeStats);

module.exports = router;