import React, { useState, useEffect } from "react";
import Note from "./components/note";
import Notification from "./components/notification";
import noteService from "./services/notes";
import Footer from "./components/footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("This is a new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    console.log("stepped inside effect");
    noteService.getAll().then(notes => setNotes(notes));
  };

  useEffect(hook, []);

  console.log("rendered", notes.length, "notes");

  const handleToggleImportance = e => {
    const id = e.target.parentNode.id;
    const note = notes.find(item => item.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : updatedNote)));
      })
      .catch(err => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      <Notification message={errorMessage} />
      <ul>{rows()}</ul>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
