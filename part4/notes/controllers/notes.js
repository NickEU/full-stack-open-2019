const notesRouter = require('express').Router();
const noteImports = require('../models/note');

const { Note } = noteImports;
const User = require('../models/user');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { name: 1, username: 1 });
  res.json(notes.map(note => note.toJSON()));
});

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

notesRouter.post('/', async (req, res, next) => {
  const { body } = req;

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user ? user._id : undefined
  });

  try {
    const savedNote = await note.save();
    if (user) {
      user.notes = user.notes.concat(savedNote._id);
      await user.save();
    } else {
      // happens if the requests are not updated
      // to use with the new version of the API
      console.log(`user is falsy`);
    }
    res.json(savedNote.toJSON());
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

notesRouter.put('/:id', (req, res, next) => {
  const { body } = req;

  const note = {
    content: body.content,
    important: body.important
  };

  Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updatedNote => {
      res.json(updatedNote.toJSON());
    })
    .catch(error => next(error));
});

module.exports = notesRouter;
