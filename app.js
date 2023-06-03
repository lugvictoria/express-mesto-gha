const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());
// временное решение авторизации пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '1f525cf06e02630312f3fed7',
  };

  next();
});
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
