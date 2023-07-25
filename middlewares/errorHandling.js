// Централизованный обработчик ошибок
module.exports = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { status = 500, message } = err;
  // проверяем статус и создаем сообщение ошибки в зависимости от него
  const errorMessage = status === 500 ? 'На сервере произошла ошибка' : message;
  // отправялем сообщение об ошибке
  res.status(status).send({ errorMessage });
  next();
};
