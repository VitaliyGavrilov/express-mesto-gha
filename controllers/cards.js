const Card = require('../models/card');// импортируем модель карточек
// создаем контролер для гет-запросов
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
// создаем контролер для пост-запросв
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
