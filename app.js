// подключаем модули и пакеты
const express = require('express');// сервер
const mongoose = require('mongoose');// бд
const console = require('console');// шоб линтер не ругался как бабка
// запускаем сервер и задаем переменные окружения
const { PORT = 3000, BASE_PATH = 'http://localhost:3000', MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;// переменные окружения
const app = express();
// подключаемся к бд
mongoose.connect(MONGO_URL);

app.use(express.json());
// Миделвэр, добавляет в каждый запрос объект user, для карточек
app.use((req, res, next) => {
  req.user = {
    _id: '64ad178f80c8b7a305016ff6', // id кошки домашней
  };
  next();
});
// испоьзуем роуты
app.use('/users', require('./routes/users'));// для данных фильмов
// слушатель
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
