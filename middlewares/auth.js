const jwt = require('jsonwebtoken');
// мидлвэр для авторизации, что бы каждый раз не логиниться
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  // Избавляемся от Bearer и записываем токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  // попытаемся верифицировать токен
  try {
    payload = jwt.verify(token, '123456789');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;
  // пропускаем запрос дальше
  next();
};
