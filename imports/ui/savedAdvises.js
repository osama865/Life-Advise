import React, { useRef, useState } from "react";
import { Meteor } from "meteor/meteor";

// import {MongoClient} from "mongodb"

/*
  |--------------------------------------------------
  | the local db for user
  | add advises and compare them later with new fetched advises
  | will create another collection for user's saved advised for saved page
  | remove a advises/quotes from the list
  | const clientDB = new MongoClient.connect('advises')
  | meteor npm install --save mongodb
  |--------------------------------------------------
*/

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
    Meteor.call("deleteAdvise", id, (err, res) => {
      if (err) throw new Error(err);
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
        value={advise.note}
        onChange={(e) => setEditedNote(e.target.value)}
      />
      <button onClick={handleNoteEdit}>Edit</button>
      <div>{''}</div>
      <button onClick={deleteNote}>Remove Advise</button>
    </>
  );
}
