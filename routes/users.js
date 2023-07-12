// Импорты
const router = require('express').Router();// импорт + создаем роутер
const {
  getUsers, createUser, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');// импортируем контролеры для пользователя
// Настраиваем роут users, адрес: /users
// для /
router.get('/', getUsers);// при гет-запросе всех пользователей используется контролер getUsers
router.post('/', createUser);// при пост-запросе для сощдания пользователя используется контролер createUser
// для /:userId
router.get('/:userId', getUserById);// при гет-запросе пользователя по id используеться контролер getUserById
// для /me
router.patch('/me', updateProfile);// при патч-запросе на обновление данных профиля используеться контролер updateProfile
router.patch('/me/avatar', updateAvatar);// при патч-запросе на обновление аватара профиля используеться контролер updateAvatar
// Экспорт роута
module.exports = router;
