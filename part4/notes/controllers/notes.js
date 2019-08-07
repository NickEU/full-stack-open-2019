const notesRouter = require('express').Router();
const noteImports = require('../models/note');

const { Note } = noteImports;

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  res.json(notes.map(note => note.toJSON()));
});

notesRouter.get('/:id', async (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

notesRouter.post('/', async (req, res, next) => {
  const { body } = req;
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote.toJSON());
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
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
