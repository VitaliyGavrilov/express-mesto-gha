const router = require('express').Router();// создаем роутер
const { getUsers, createUser, getUserById } = require('../controllers/users');// импортируем контролеры для фильмов
// настраиваем роуты
router.get('/', getUsers);// при гет-запросе всех пользователей используется контролер getUsers
router.post('/', createUser);// при пост-запросе для сощдания пользователя используется контролер createUser
router.get('/:userId', getUserById);// при гет-запросе пользователя по id используеться контролер getUserById
// экспорт роута
module.exports = router;
