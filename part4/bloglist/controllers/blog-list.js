const blogRouter = require('express').Router();
const blogImports = require('../models/blog');

const { Blog } = blogImports;

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs.map(blog => blog.toJSON()));
  });
});

blogRouter.get('/h', (req, res) => {
  res.end('hello!');
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter;
