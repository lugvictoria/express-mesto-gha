const express = require('express');
const {
  getAllUsers, getUser, getCurrentUser,  updateUser, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
users.get('/me', getCurrentUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
