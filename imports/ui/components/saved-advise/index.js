import React, { useRef, useState } from "react";
import { useIndexDB } from "../../../../database/client/indexDB";

const savedAdvisesDB = useIndexDB("advises");
const ids = useIndexDB("ids");

export default function SavedAdvises({ advise, _id, color }) {
  const [editedNote, setEditedNote] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const note = useRef();

  const updateNote = () => {
    advise.note = editedNote
    console.log(advise , 'for updating');
    savedAdvisesDB.update(advise.id,advise);
  };

  const clearNote = (e) => {
    note.current.value = "";
    setEditedNote("");
  };

  const remove = () => {
    savedAdvisesDB.remove(advise.id);
    ids.remove({ _id });
    setIsRemoved(true);
  };

  return (
    <>
      <div hidden={isRemoved}>
        <blockquote className={`blockquote color${color}`}>
          {advise.text}
          <span>ــ {advise.author}</span>
          <div className="options">
            <button className="btn" onClick={clearNote}>
              <i className="fas fa-backspace"></i> Clear Note.
            </button>
            <textarea
              autoComplete="false"
              dir={advise.language === "en" ? "ltr" : "rtl"}
              spellCheck="false"
              cols="20"
              rows="5"
              ref={note}
              defaultValue={advise.note}
              onChange={(e) => setEditedNote(e.target.value)}
            />
          </div>
          <div className="center">
            <button onClick={updateNote} className="btn favorite">
              <i className="far fa-edit"></i> Edit Note
            </button>
            <button onClick={remove} className="btn favorite">
              <i className="fa fa-trash"></i> Delete Advise
            </button>
          </div>
        </blockquote>
      </div>
    </>
  );
}
