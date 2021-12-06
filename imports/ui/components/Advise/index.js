import React, { useState, useRef, useEffect } from "react";
import { useIndexDB } from "../../../../database/client/indexDB";

const advises = useIndexDB("advises");
const ids = useIndexDB("ids");
let savedIds = [];

(async () => {
  savedIds = await ids.fetchAll();
})();
export default function Advise({ advise, id }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const textfield = useRef();

  const saveAdvise = () => {
    advise.note = editedNote;
    let _id = id;
    advises.insert(advise);
    ids.insert({ _id });
    setIsSaved(true);
  };

  const findMatched = () => {
    savedIds?.map((val) => {
      if (val._id === id) {
        setIsSaved(true);
      }
    });
  };

  useEffect(() => {
    findMatched();
  }, []);

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
        {isSaved === false ? (
          <>
            <button onClick={saveAdvise}>Save</button>
          </>
        ) : (
          <>
            <button>Saved</button>
          </>
        )}
      </>
      <h1>---------------------------</h1>
    </>
  );
}
