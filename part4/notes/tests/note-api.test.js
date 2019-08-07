const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test-helper');
const app = require('../app');
const { Note } = require('../models/note');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();

  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

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

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
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

test('note without content is not added', async () => {
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

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd.length).toBe(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map(r => r.content);

  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(() => {
  mongoose.connection.close();
});
