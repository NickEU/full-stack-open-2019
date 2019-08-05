const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRouter = require('./controllers/blog-list');
const config = require('./utils/config');

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);

module.exports = app;
