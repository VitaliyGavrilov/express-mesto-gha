// Импорты
const User = require('../models/user');// импортируем модель пользователей
const {
  CREATED, NOT_FOUND, OK, DATA_ERROR, SERVER_ERROR,
} = require('../const/error');// импортируем ошибки
// Создаем контролеры и сразу экспортируем их
// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => { // создаем контролер для гет-запроса всех пользователей
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
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
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
// POST /users — создаёт пользователя
module.exports.createUser = (req, res) => { // создаем контролер для пост-запроса
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
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
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
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
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(DATA_ERROR).send({ message: `Некорректные данные: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
