const mongoose = require('mongoose');
const supertest = require('supertest');
// const helper = require('./api-helper');
const { blogs: initialBlogs } = require('../utils/mock-blogs');
const app = require('../app');
const { Blog } = require('../models/blog');

const api = supertest(app);

// npm run test -- -t 'apitest'
// ^^ use this to run npm test script
describe('apitest', () => {
  const JEST_TIMEOUT = 10000; // ms
  beforeEach(async () => {
    await Blog.deleteMany();
    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArr = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArr);
  });

  test(
    'blogs are returned as json',
    async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    },
    JEST_TIMEOUT,
  );

  test(
    'all blogs are returned',
    async () => {
      const response = await api.get('/api/blogs');

      expect(response.body.length).toBe(initialBlogs.length);
    },
    JEST_TIMEOUT,
  );

  afterAll(() => {
    mongoose.connection.close();
  });
});
