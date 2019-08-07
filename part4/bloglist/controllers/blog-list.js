const blogRouter = require('express').Router();
const blogImports = require('../models/blog');

const { Blog } = blogImports;

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs.map(blog => blog.toJSON()));
  } catch (exc) {
    next(exc);
  }
});

blogRouter.get('/h', (req, res) => {
  res.end('hello!');
});

blogRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    if (!blog.title && !blog.url) {
      res.status(400).end();
    } else {
      const result = await blog.save();
      res.status(201).json(result);
    }
  } catch (exc) {
    next(exc);
  }
});

module.exports = blogRouter;
