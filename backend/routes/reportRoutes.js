const express = require('express');
const {
  submitReport,
  getReports,
  getEmployeeReports,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getReports)
  .post(roleMiddleware('employee'), submitReport);

router.get('/employee/:employeeId', roleMiddleware('manager'), getEmployeeReports);

module.exports = router;