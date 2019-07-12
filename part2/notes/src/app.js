import React, { useState } from "react";
import Note from "./components/note";

const App = props => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("This is a new note");
  const [showAll, setShowAll] = useState(true);

  const rows = () => {
    let notesToRender = showAll ? notes : notes.filter(item => item.important);
    return notesToRender.map(note => <Note key={note.id} note={note} />);
  };

  const addNote = e => {
    e.preventDefault();
    console.log("btn clicked", e.target);
    setNotes([
      ...notes,
      {
        id: notes[notes.length - 1].id + 1,
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      }
    ]);

    setNewNote("");
  };

  const handleNoteChange = e => {
    setNewNote(e.target.value);
    console.log(newNote);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>{rows()}</ul>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
