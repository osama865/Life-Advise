import React, { useRef, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useIndexDB } from "./indexDB";
import { changes, get, set } from "./shared";
import { useTracker } from "meteor/react-meteor-data";

const savedAdvisesDB = useIndexDB("advises");
const ids = useIndexDB("ids");

export default function SavedAdvises({ advise, _id }) {
  const [editedNote, setEditedNote] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);

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
    savedAdvisesDB.remove({ _id });
    ids.remove({ _id });
    setIsRemoved(true);
  };
  return (
    <div hidden={isRemoved}>
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
    </div>
  );
}
