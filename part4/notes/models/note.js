const mongoose = require('mongoose');

const CONTENT_MIN_LENGTH = 3;

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: CONTENT_MIN_LENGTH,
    required: true
  },
  date: { type: Date, required: true },
  important: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = {
  Note: mongoose.model('Note', noteSchema),
  CONTENT_MIN_LENGTH
};
