const { celebrate, Joi } = require('celebrate');
// Регулярное выражение ссылок
const regular = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
// Валидация данных пользователя
// Логин(вход в аккаунт)
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(4).max(50).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});
// Регистрация(создание пользователя)
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    email: Joi.string().min(4).max(50).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});
// Валидация id профиля
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24)
      .required(),
  }),
});
// Обновление данных профиля
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
// Обновление аватара профиля
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(4).pattern(regular),
  }),
});
// Валидация карточек
// Создание карточки
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    link: Joi.string().pattern(regular)
      .required(),
  }),
});
// Валидация id карточки
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24)
      .required(),
  }),
});
// Экспорт
module.exports = {
  validateLogin,
  validateCreateUser,
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCreateCard,
  validateCardId,
};
