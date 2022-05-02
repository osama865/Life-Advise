import React, { useState, useRef, useEffect } from "react";
import { useIndexDB } from "../../../../database/client/indexDB";

const advises = useIndexDB("advises");
const ids = useIndexDB("ids");

export default function Advise({ advise, id, color }) {
  const [editedNote, setEditedNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const textfield = useRef();

  const saveAdvise = () => {
    advise.note = editedNote;
    let _id = id;
    advises.insert(advise);
    setIsSaved(true);
  };

  const findMatched = () => {
    advises.find().then((res) => {
      console.log('res promise', res);
      res?.map((val) => {
        if (val._id === id) {
          setIsSaved(true);
        }
      });
    })

  };

  const handleChange = (e) => {
    e.preventDefault();
    setEditedNote(e.target.value);
  };

  useEffect(() => {
    findMatched();
  }, []);

  return (
    <div className="container">
      <blockquote className={`blockquote color${color}`}>
        {advise.text}
        <span> ــ {advise.author}</span>
        {isSaved === false ? (
          <div className="options">
            <textarea
              dir={advise.language === "ar" ? "rtl" : "ltr"}
              ref={textfield}
              value={editedNote}
              placeholder={
                advise.language === "ar"
                  ? "احفظها واضف افكارك ?"
                  : "Save it with note?"
              }
              onChange={handleChange}
              cols="20"
              rows="5"
            />
            <button className="btn favorite saved" onClick={saveAdvise}>
              <i className="far fa-heart"></i> add to favorite
            </button>
          </div>
        ) : (
          <div className="options">
            <button className="btn favorite">
              <i className="fas fa-heart"></i> allready there!
            </button>
          </div>
        )}
      </blockquote>
    </div>
  );
}
