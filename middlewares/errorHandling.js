// Централизованный обработчик ошибок
module.exports = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  // проверяем статус и создаем сообщение ошибки в зависимости от него
  const errorMessage = statusCode === 500 ? 'На сервере произошла ошибка' : message;
  // отправялем сообщение об ошибке
  res.status(statusCode).send({ errorMessage });
  next();
};
