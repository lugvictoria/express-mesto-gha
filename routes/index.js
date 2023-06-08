const express = require('express');
const { celebrate, Joi } = require('celebrate');

const handleError = require('../utils/handleError');
const users = require('./users');
const createUser = require('./users');
const cards = require('./cards');
const login = require('../controllers/login');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);

router.all('*', auth);

router.use(users);
router.use(cards);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = router;
