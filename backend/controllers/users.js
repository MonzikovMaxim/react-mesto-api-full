/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const ConflictError = require('../errors/conflict');
const UnauthorizedError = require('../errors/unauthorized');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((error) => {
    if (error.name === 'ValidationError') {
      throw new BadRequest('C запросом что-то не так');
    } else {
      next(error);
    }
  })
  .catch(next);

const getUser = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь с таким id на найден');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new UnauthorizedError('Невалидный id');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой email уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        const {
          // eslint-disable-next-line no-shadow
          name, email, about, avatar,
        } = user;
        res.send({
          name, email, about, avatar,
        });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          throw new BadRequest('Переданы некорректные данные при создании пользователя');
        } else {
          next(error);
        }
      })
      .catch(next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((error) => {
      throw new UnauthorizedError(error.message);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь с таким id на найден');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequest('Невалидный id');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  return User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь с таким id на найден');
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  return User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь с таким id на найден');
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные');
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getCurrentUser,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
