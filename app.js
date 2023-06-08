const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { handleError } = require('./middlewares/handleError');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());
app.use(express.json());
app.use(router);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
