const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/api-helper');
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

  describe('testing GET:', () => {
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
  });

  describe('testing POST:', () => {
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

    test(
      'if likes prop is missing from the request it defaults to 0',
      async () => {
        const newBlog = {
          title: 'Integrating Prettier + ESLint + Airbnb Style Guide in VSCode',
          author: 'Jeffrey Zhen',
          url:
            'https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a',
        };
        const savedNote = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);
        expect(savedNote.body.likes).toBe(0);
      },
      JEST_TIMEOUT,
    );

    test(
      'if title and url props are missing from post req api responds with 400 status code',
      async () => {
        const newBlog = {
          author: 'Jeffrey Zhen',
          likes: 6,
        };

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400);
      },
      JEST_TIMEOUT,
    );
  });

  describe('testing DELETE:', () => {
    test(
      'can delete a blog',
      async () => {
        const blogs = await helper.blogsInDb();
        await api.delete(`/api/blogs/${blogs[0].id}`).expect(204);
      },
      JEST_TIMEOUT,
    );
  });

  describe('testing PUT:', () => {
    test(
      'can update all fields of an individual blogpost',
      async () => {
        const blogs = await helper.blogsInDb();
        const updatedBlog = {
          likes: 25,
          title: 'The 10 Component Commandments',
          author: 'selbekk',
          url: 'https://dev.to/selbekk/the-10-component-commandments-2a7f',
        };
        await api
          .put(`/api/blogs/${blogs[0].id}`)
          .send(updatedBlog)
          .expect(200);

        const blogsAfterPut = await helper.blogsInDb();
        Object.entries(updatedBlog).forEach((blog) => {
          expect(Object.entries(blogsAfterPut[0])).toContainEqual(blog);
        });
      },
      JEST_TIMEOUT,
    );

    test(
      "can update likes field if it's the only field of req body",
      async () => {
        const blogs = await helper.blogsInDb();
        const newLikesVal = blogs[0].likes + 1;
        const updatedBlogRes = await api
          .put(`/api/blogs/${blogs[0].id}`)
          .send({ likes: newLikesVal })
          .expect(200);
        expect(updatedBlogRes.body.likes).toBe(newLikesVal);
      },
      JEST_TIMEOUT,
    );

    test(
      'put req with empty body returns 400',
      async () => {
        const blogs = await helper.blogsInDb();
        await api
          .put(`/api/blogs/${blogs[0].id}`)
          .send({})
          .expect(400);
      },
      JEST_TIMEOUT,
    );
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
