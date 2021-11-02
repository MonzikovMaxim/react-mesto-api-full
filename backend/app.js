require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const { validateUserData } = require('./middlewares/validate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 4000 } = process.env;
const app = express();

app.use(express.json());

const CORS_WHITELIST = [
  'http://localhost:3000',
  'https://thisismesto.students.nomoredomains.monster',
  'http://thisismesto.students.nomoredomains.monster',
];

// eslint-disable-next-line consistent-return
const corsOption = {
  credentials: true,
  optionsSuccessStatus: 204,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOption));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', validateUserData, createUser);
app.post('/signin', validateUserData, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use(errors());
app.use(error);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.listen(PORT, () => {
  console.log(`Приложение подключено к порту ${PORT}`);
});
