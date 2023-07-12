// Импорт
const router = require('express').Router();// создаем роутре
const cardRouter = require('./cards');// импорт роута карточек
const userRouter = require('./users');// импорт роута пользователя
const { NOT_FOUND } = require('../const/error');// импорт ошибки
// Обьединяем роуты
router.use('/users', userRouter);
router.use('/cards', cardRouter);
// На случай запроса на неправильный путь
router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});
// Экспорт биг-роута
module.exports = router;
