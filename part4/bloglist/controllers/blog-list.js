const blogRouter = require('express').Router();
const blogImports = require('../models/blog');

const { Blog } = blogImports;

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.get('/h', (req, res) => {
  res.end('hello!');
});

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogRouter;
