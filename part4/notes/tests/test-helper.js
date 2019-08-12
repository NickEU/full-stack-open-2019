const { Note } = require('../models/note');
const User = require('../models/user');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
    userId: '5d4c374d9728d24c18b7dda8'
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
    userId: '5d4c374d9728d24c18b7dda8'
  }
];

const nonExistingId = async () => {
  const note = new Note({
    content: 'will remove this soon',
    date: new Date(),
    userId: '5d4c374d9728d24c18b7dda8'
  });
  await note.save();
  await note.remove();
  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb
};
