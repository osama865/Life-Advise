import React, { useRef, useState } from "react";
import { Meteor } from "meteor/meteor";

export default function SavedAdvises({ advise, id }) {
  const [editedNote, setEditedNote] = useState("");
  const handleNoteEdit = (e) => {
    // update the note
    console.log("update your note with the new note ", editedNote);
    Meteor.call("updateNote", editedNote, id, (err, res) => {
      if (err) throw new Error(err);
      console.log(res);
    });
  };
  const note = useRef();
  const clearNote = (e) => {
    note.current.value = "";
    setEditedNote("");
  };

  const deleteNote = () => {
    console.log("delete advise with id : ", id);
    Meteor.call("deleteAdvise", id, (err, res) => {
      if (err) throw new Error(err);
      console.log(res);
    });
  };
  clearNote;
  return (
    <>
      <h2>{advise.text}</h2>
      <h4>{advise.source}</h4>
      <h5>{advise.date.toUTCString()}</h5>
      <button onClick={clearNote}>clear note</button>
      <textarea
        ref={note}
        defaultValue={advise.note}
        onChange={(e) => setEditedNote(e.target.value)}
      />
      <button onClick={handleNoteEdit}>Edit</button>
      <div>{''}</div>
      <button onClick={deleteNote}>Remove Advise</button>
    </>
  );
}
