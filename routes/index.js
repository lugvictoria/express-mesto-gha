const express = require('express');
const handleError = require('../utils/handleError');
const users = require('./users');
const createUser = require('./users');
const cards = require('./cards');
const login = require('../controllers/login');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', login);
router.all('*', auth);

router.use(users);
router.use(cards);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = router;
