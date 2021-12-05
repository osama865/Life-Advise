import React, { useRef, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useIndexDB } from "./indexDB";

const savedAdvisesDB = useIndexDB("advises");
const ids = useIndexDB("ids");

export default function SavedAdvises({ advise, _id }) {
  const [editedNote, setEditedNote] = useState("");

  const updateNote = (e) => {
    // update the note
    savedAdvisesDB.update({ _id }, { note: editedNote });
  };
  const note = useRef();
  const clearNote = (e) => {
    note.current.value = "";
    setEditedNote("");
  };

  const remove = () => {
    // remove it from user saved
    savedAdvisesDB.remove({ _id });
    // remove its id from ids array
    ids.remove({ _id })
    location.reload()
  };
  return (
    <>
      <h2>{advise.text}</h2>
      <h4>{advise.author}</h4>
      <button onClick={clearNote}>clear note</button>
      <textarea
        ref={note}
        defaultValue={advise.note}
        onChange={(e) => setEditedNote(e.target.value)}
      />
      <button onClick={updateNote}>Edit</button>
      <div></div>
      <button onClick={remove}>Remove Advise</button>
      <h1>---------------------------</h1>
    </>
  );
}
