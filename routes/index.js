const express = require('express');
const { handleError } = require('../utils/handleError');
const { users } = require('./users');
const { cards } = require('./cards');

const router = express.Router();

router.use('/users', users);
router.use('/cards', cards);
router.all('*', (req, res) => {
  const err = new Error('Неверный адрес запроса');
  err.name = 'NotFoundError';
  handleError(err, req, res);
});

module.exports = router;
