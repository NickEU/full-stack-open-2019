require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

const CONTENT_MIN_LENGTH = 3;

mongoose
  .connect(url, { useNewUrlParser: true, useFindAndModify: false })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: CONTENT_MIN_LENGTH,
    required: true
  },
  date: { type: Date, required: true },
  important: Boolean
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// const Note = mongoose.model("Note", noteSchema);
module.exports = {
  Note: mongoose.model("Note", noteSchema),
  CONTENT_MIN_LENGTH
};
