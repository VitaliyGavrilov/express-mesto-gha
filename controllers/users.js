// Импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');// импортируем модель пользователей
const {
  CREATED, NOT_FOUND, OK, DATA_ERROR, SERVER_ERROR,
} = require('../const/error');// импортируем ошибки
// Создаем контролеры для взаимодейтвия с данными пользователей и сразу экспортируем их
// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => { // создаем контролер для гет-запроса всех пользователей
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
    });
};
// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res) => { // создаем контролер для гет-запроса пользователя по id
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(DATA_ERROR).send({ message: `Некорректный _id пользователя: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
    });
};
// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((selectedUser) => {
      if (!selectedUser) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(OK).send(selectedUser);
      }
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
    });
};
// PATCH /users/me — обновляет профиль
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
    });
};
// PATCH /users/me/avatar — обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
    });
};
// Создаем контролеры для создания пользователя и входа в аккаунт
// POST /signin — вход в аккаунт
module.exports.login = (req, res) => {
  // деструктуризацие получаем данные из тела запроса
  const { email, password } = req.body;
  // создаем пользователя
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
// POST /signup — регистрация, создаёт пользователя
module.exports.createUser = (req, res) => { // создаем контролер для пост-запроса
  // деструктуризацие получаем данные из тела запроса
  const {
    name, about, avatar, email, password,
  } = req.body;
  // хеширование пароля
  bcrypt.hash(password, 10)
    // создаем пользователя
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    // отправляем ответ= данные созданного пользователя, без пароля
    .then((user) => res.status(CREATED).send({
      _id: user._id, name, about, avatar, email,
    }))
    // обрабатываем ошибки
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
    });
};
