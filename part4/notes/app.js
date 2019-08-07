const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(err => {
    logger.error('error! cannot connect to MongoDB:', err.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
