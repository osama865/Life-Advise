import React, { useState, useRef, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export default function Advise({ advise, id }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  console.log(advise.saved);
  const textfield = useRef();
  useTracker(() => {
    Meteor.call("saved", id, (err, res) => {
      setIsSaved(res);
      console.log();
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
        console.log(isSaved);
      });
    }
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
      <>
        {isSaved === false ? (
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
