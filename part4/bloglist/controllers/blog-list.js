const blogRouter = require('express').Router();
const blogImports = require('../models/blog');
const helper = require('../utils/api-helper');

const { Blog } = blogImports;

blogRouter.get('/', async (req, res, next) => {
  try {
    res.json(await helper.blogsInDb());
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

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exc) {
    next(exc);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const {
      title, author, url, likes,
    } = req.body;

    if (!title && !author && !url && !likes) {
      res.status(400).end();
      return;
    }

    let blog;
    if (!title || (!author && !url)) {
      const blogs = await helper.blogsInDb();
      const blogToBeUpdated = blogs.find(blogEl => blogEl.id === req.params.id);
      blog = blogToBeUpdated;
      blog.likes = likes;
    } else {
      blog = {
        title,
        author,
        url,
        likes,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.status(200).json(updatedBlog.toJSON());
  } catch (exc) {
    next(exc);
  }
});

module.exports = blogRouter;
