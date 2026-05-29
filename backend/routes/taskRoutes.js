const express = require('express');
const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(roleMiddleware('manager'), createTask);

router.route('/:id/status')
  .put(updateTaskStatus);

router.route('/:id')
  .delete(roleMiddleware('manager'), deleteTask);

module.exports = router;