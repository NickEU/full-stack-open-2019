const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog-list');
const config = require('./utils/config');

const app = express();

const mongoUrl = config.MONGODB_URL;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.error('error! cannot connect to MongoDB:', err.message);
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);

module.exports = app;
