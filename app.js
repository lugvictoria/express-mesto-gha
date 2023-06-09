const express = require('express');
const mongoose = require('mongoose');
const { errors }= require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
});
app.use(helmet());
app.use(express.json());
app.use(router);

app.use(errors()); // обработчик ошибок celebrate


app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
