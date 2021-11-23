import React, { useRef, useState } from "react";
import { Meteor } from "meteor/meteor";
// import {MongoClient} from "mongodb"

export default function SavedAdvises({ advise, id }) {
  const [editedNote, setEditedNote] = useState("");
  const handleNoteEdit = (e) => {
    // update the note
    Meteor.call("updateNote", editedNote, id, (err, res) => {
      if (err) throw new Error(err);
    });
  };
  const note = useRef();
  const clearNote = (e) => {
    note.current.value = "";
    setEditedNote("");
  };

  const deleteNote = () => {
    // remove it from user saved
    Meteor.call("deleteAdvise", id, (err, res) => {
      if (err) throw new Error(err);
    });

    // set saved property to not saved from advises collection
    Meteor.call("resetSave", id, (err, res) => {
      if (err) throw new Error(err);
    });
  };
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
      <div>{advise.language}</div>
      <button onClick={deleteNote}>Remove Advise</button>
    </>
  );
}
