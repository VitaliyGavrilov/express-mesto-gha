// Импорты
const router = require('express').Router();// импорт + создаем роутер
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');// импортируем контролеры для пользователя
// Валидация
const {
  validateUserId, validateUpdateProfile, validateUpdateAvatar,
} = require('../middlewares/validation');
// Настраиваем роут users, адрес: /users
router.get('/me', getCurrentUser);// при гет-запросе на получение данных текущего пользователя
// для /
router.get('/', getUsers);// при гет-запросе всех пользователей используется контролер getUsers
// для /:userId
router.get('/:userId', validateUserId, getUserById);// при гет-запросе пользователя по id используеться контролер getUserById
// для /me
router.patch('/me', validateUpdateProfile, updateProfile);// при патч-запросе на обновление данных профиля используеться контролер updateProfile
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);// при патч-запросе на обновление аватара профиля используеться контролер updateAvatar
// Экспорт роута
module.exports = router;
