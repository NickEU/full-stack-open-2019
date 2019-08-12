const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./test-helper');
const app = require('../app');

const api = supertest(app);

describe('APITEST when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root69', password: 'secret25' });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'NickEU',
      name: 'Kirsan Lever',
      password: 'engage25'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  }, 15000);

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root69',
      name: 'Ivan Dolvich',
      password: 'qwerty25'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  }, 15000);
});

afterAll(() => {
  mongoose.connection.close();
});
