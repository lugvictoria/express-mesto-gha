const express = require('express');
const { handleError } = require('../utils/handleError');
const users = require('./users');
const createUser = require('./users');
const cards = require('./cards');
const { login } = require('../controllers/login');

const router = express.Router();

router.post('/signup', express.json(), createUser);
router.post('/signin', express.json(), login);

router.use(users);
router.use(cards);
router.use((req, res) => {
  const err = new Error('Неверный адрес запроса');
  err.name = 'NotFoundError';
  handleError(err, req, res);
});

module.exports = router;
