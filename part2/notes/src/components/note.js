import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? `important` : `not important`;
  return (
    <div>
      <li className="note" id={note.id}>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    </div>
  );
};

export default Note;
