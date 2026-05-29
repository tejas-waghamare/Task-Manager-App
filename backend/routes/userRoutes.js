const express = require('express');
const { getUsers, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);
router.use(roleMiddleware('manager'));

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;