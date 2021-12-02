import React, { useState, useRef, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export default function Advise({ advise, id }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const textfield = useRef();
  useTracker(() => {
    Meteor.call("saved", id, (err, res) => {
      setIsSaved(res);
    });
  });

  const saveAdvise = () => {
    if (advise.saved === false) {
      // add this advise to savedAdvises collection and do not ferget to add note when you save it
      advise.note = editedNote;
      Meteor.call("saveAdvise", advise, (err, res) => {
        if (err) throw new Error(err);
      });
      Meteor.call("updateSave", id, (err, res) => {
        if (err) throw new Error(err);
        setIsSaved(res);
      });
    }
  };

  return (
    <>
      <h2>{advise.text}</h2>
      <h4>{advise.author}</h4>
      <div>
        <textarea
          ref={textfield}
          placeholder="Save it with note?"
          onChange={(e) => setEditedNote(e.target.value)}
          hidden={isSaved}
        />
      </div>
      <>
        {isSaved === undefined || false ? (
          <>
            <button onClick={saveAdvise}>Save</button>
          </>
        ) : (
          <>
            <button>Allready Saved</button>
          </>
        )}
      </>
      <h1>---------------------------</h1>
    </>
  );
}
