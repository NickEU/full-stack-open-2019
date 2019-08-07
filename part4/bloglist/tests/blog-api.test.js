const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./api-helper');
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

  test(
    "unique identifier 'id' exists",
    async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach((entry) => {
        expect(entry.id).toBeDefined();
      });
    },
    JEST_TIMEOUT,
  );

  test(
    'post req w a new blog saves to db correctly and increases the nmbr of blgs in the system by 1',
    async () => {
      const newBlog = {
        title: 'Integrating Prettier + ESLint + Airbnb Style Guide in VSCode',
        author: 'Jeffrey Zhen',
        url:
          'https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a',
        likes: 6,
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const blogsAfterPost = await helper.blogsInDb();
      expect(blogsAfterPost.length).toBe(initialBlogs.length + 1);
    },
    JEST_TIMEOUT,
  );

  afterAll(() => {
    mongoose.connection.close();
  });
});
