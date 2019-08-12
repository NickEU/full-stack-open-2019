const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test-helper');
const app = require('../app');
const { Note } = require('../models/note');

const api = supertest(app);

beforeEach(async () => {
  // The noteObjects variable is assigned to an array of Mongoose objects
  // that are created with the Note constructor for each of the notes in the helper.initialNotes array.
  // The next line of code creates a new array that consists of promises, that are created by calling
  // the save method of each item in the noteObjects array.
  // In other words, it is an array of promises for saving each of the items to the database.

  // The Promise.all method can be used for transforming an array of promises into a single promise,
  // that will be fulfilled once every promise in the array passed to it as a parameter is resolved.
  // The last line of code await Promise.all(promiseArray) waits that every promise for saving a note
  // is finished, meaning that the database has been initialized.

  await Note.deleteMany({});

  // const noteObjects = helper.initialNotes.map(note => new Note(note));
  // const promiseArray = noteObjects.map(note => note.save());
  // await Promise.all(promiseArray);
  // Promise.all() executes promises in parallel If the promises need to be executed in a particular order,
  // this will be problematic. In situations like this, the operations can be executed inside of a for...of block,
  // that guarantees a specific execution order, for ex:
  for (const note of helper.initialNotes) {
    const noteObject = new Note(note);
    await noteObject.save();
  }
});

describe('APITEST when there are initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body.length).toBe(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map(res => res.content);

    expect(contents).toContain('Browser can execute only Javascript');
  });

  describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
      const notesAtStart = await helper.notesInDb();

      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      // have to do this conversion to avoid type mismatch..
      // without this resultNote.date is of type 'object'
      // while noteToView.date is of type string
      noteToView.date = JSON.stringify(noteToView.date);
      resultNote.body.date = JSON.stringify(resultNote.body.date);
      // console.log('rec type = ', typeof resultNote.body.date);
      // console.log('exp type = ', typeof noteToView.date);
      expect(resultNote.body).toEqual(noteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe('addition of a new note', () => {
    test('success with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: '5d518628f93ca43a5c3a8436'
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(res => res.content);

      expect(contents).toContain('async/await simplifies making async calls');
    });

    test('fail with code 400 with invalid data', async () => {
      const newNote = {
        important: true
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd.length).toBe(helper.initialNotes.length);
    });
  });

  describe('deletion of a note', () => {
    test('success w 204 if ID is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
      const notesAtEnd = await helper.notesInDb();

      expect(notesAtEnd.length).toBe(helper.initialNotes.length - 1);

      const contents = notesAtEnd.map(r => r.content);

      expect(contents).not.toContain(noteToDelete.content);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
