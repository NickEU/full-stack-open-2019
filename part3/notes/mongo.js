const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://ivan-grozny:${password}@cluster0-om9p9.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "Javascript is powerful",
//   date: new Date(),
//   important: true
// });

// note.save().then(result => {
//   console.log(`note saved!`, result);
//   mongoose.connection.close();
// });

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
});
