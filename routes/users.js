const express = require('express');
const {
  getAllUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
