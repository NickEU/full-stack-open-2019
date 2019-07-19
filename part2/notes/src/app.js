import React, { useState, useEffect } from "react";
import Note from "./components/note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("This is a new note");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log("stepped inside effect");
    noteService.getAll().then(notes => setNotes(notes));
  };

  useEffect(hook, []);

  console.log("rendered", notes.length, "notes");

  const handleToggleImportance = e => {
    const id = Number(e.target.parentNode.id);
    const note = notes.find(item => item.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : updatedNote)));
      })
      .catch(err => {
        alert(`the note '${note.content}' was already deleted from the server`);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const rows = () => {
    let notesToRender = showAll ? notes : notes.filter(item => item.important);
    return notesToRender.map(note => (
      <Note
        key={note.id}
        note={note}
        toggleImportance={handleToggleImportance}
      />
    ));
  };

  const addNote = e => {
    e.preventDefault();
    console.log("btn clicked", e.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    };
    noteService.create(noteObject).then(addedNote => {
      setNotes(notes.concat(addedNote));
    });
    setNewNote("");
  };

  const handleNoteChange = e => {
    setNewNote(e.target.value);
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
