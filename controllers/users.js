const User = require('../models/user');// импортируем модель пользователей
// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => { // создаем контролер для гет-запроса всех пользователей
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res) => { // создаем контролер для гет-запроса пользователя по id
  User.findById(req.params.userId)
    .then((user) => {
      if (user) { res.send({ data: user }); }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
// POST /users — создаёт пользователя
module.exports.createUser = (req, res) => { // создаем контролер для пост-запроса
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
// КОНТРОЛЕРЫ ВРОДЕ ГОТОВЫ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ, ДЕЛАЙ РОУТЫ
