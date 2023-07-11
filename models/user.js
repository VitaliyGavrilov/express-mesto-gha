const mongoose = require('mongoose');// подключаем монго
// создаем схему пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});
// создаем на основек схемы модель и экспортируем ее
module.exports = mongoose.model('user', userSchema);
