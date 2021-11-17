import React, { useState, useRef, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import AddCustomNote from "./addCustomNote";

export default function Advise({ advise, id }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const textfield = useRef();

  useEffect(() => {
    setIsSaved(advise.saved);
  }, []);
  const saveAdvise = () => {
    if (advise.saved === false) {
      // add this advise to savedAdvises collection and do not ferget to add note when you save it
      advise.note = editedNote;
      Meteor.call("saveAdvise", advise, id, (err, res) => {
        if (err) throw new Error(err);
      });
      Meteor.call("updateSave", id, (err) => {
        if (err) throw new Error(err);
      });
    }
  };

  const handleNoteEdit = (e) => {
    e.preventDefault();
    // update the note
    Meteor.call("updateNote", editedNote, id, (err, res) => {
      if (err) throw new Error(err);
    });
  };

  return (
    <>
      <h1>---------------------------</h1>
      <h2>{advise.text}</h2>
      <h4>{advise.source}</h4>
      <h5>{advise.date.toUTCString()}</h5>
      <div>
        <textarea
          ref={textfield}
          placeholder="Save it with note?"
          onChange={(e) => setEditedNote(e.target.value)}
          hidden={isSaved}
        />
      </div>
      <button onClick={saveAdvise}>
        {isSaved === true ? "allready Saved" : "Save"}
      </button>
      <h1>---------------------------</h1>
    </>
  );
}
