const express = require('express');
const { celebrate, Joi } = require('celebrate');

const users = require('./users');
const createUser = require('./users');
const cards = require('./cards');
const login = require('../controllers/login');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.post('*', express.json());
router.patch('*', express.json());

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use('/users', auth, users);
router.use('/cards', auth, cards);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = router;
