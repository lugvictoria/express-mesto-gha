const bcrypt = require('bcryptjs');
const User = require('../models/user');
const handleError = require('../utils/handleError');
const NotFoundError = require('../errors/NotFoundError');

const SALT_LENGTH = 10;

async function createUser(req, res) {
  try {
    const { email, password, name, about, avatar } = req.body;
    const passwordHash = await bcrypt.hash(password, SALT_LENGTH);
    const user = await User.create({
      email,
      password: passwordHash,
      name,
      about,
      avatar,
    });
    res.status(201).send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function getUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function updateAvatar(req, res) {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

module.exports = {
  getAllUsers, getUser, getCurrentUser, createUser, updateUser, updateAvatar,
};
