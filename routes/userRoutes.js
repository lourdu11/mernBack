const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);
router.use(adminOnly);

router.route('/')
    .get(getAllUsers);

router.route('/:id/role')
    .put(updateUserRole);

router.route('/:id')
    .delete(deleteUser);

module.exports = router;
