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

  let colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
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

  /**
   * <h2>{advise.text}</h2>
      <h4>{advise.author}</h4>

      <>
        {isSaved === false ? (
          <>
            <div>
              <textarea
                ref={textfield}
                placeholder="Save it with note?"
                onChange={(e) => setEditedNote(e.target.value)}
              />
            </div>
            <button onClick={saveAdvise}>Save</button>
          </>
        ) : (
          <>
            <button>Saved</button>
          </>
        )}
      </>
      <h1>---------------------------</h1>

   */
  return (
    <div className="container">
      <blockquote className={`blockquote color${colorNumber}`}>
        {advise.text}
        <span> ــ {advise.author}</span>
        {isSaved === false ? (
          <div className="options">
            <textarea
              dir={advise.language === "ar" ? "rtl" : "ltr"}
              ref={textfield}
              placeholder="Save it with note?"
              onChange={(e) => setEditedNote(e.target.value)}
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

/**
 * 
 * advise with random fetched when its allready saved
   
    <div class="container">
          <blockquote class="blockquote color3">
            Creativity is just connecting things. When you ask creative people how
            they did something, they feel a little guilty because they didn't really
            do it, they just saw something. It seemed obvious to them after a while.
            That's because they were able to connect experiences they've had and
            synthesize new things.
            <span>ــ Steve Jobs</span>
            <div class="options">
              <button class="btn">
                <i class="fas fa-backspace"></i> Clear Note.
              </button>
              <textarea
                placeholder="Save it with Note."
                name=""
                id=""
                cols="20"
                rows="5"
              ></textarea>
            </div>
            <div class="center">
              <button class="btn favorite">
                <i class="far fa-heart"></i> favorite
              </button>
              <button class="btn favorite">
                <i class="fa fa-heart"></i> favorite
              </button>
            </div>
          </blockquote>
        </div>


    <div class="center">
      <button class="btn favorite">
        <i class="fas fa-comment-alt"></i> Get More Advices
      </button>
    </div>
    <div class="container">
      <blockquote class="blockquote color4">
        Creativity is just connecting things. When you ask creative people how
        they did something, they feel a little guilty because they didn't really
        do it, they just saw something. It seemed obvious to them after a while.
        That's because they were able to connect experiences they've had and
        synthesize new things.
        <span>ــ Steve Jobs</span>
        <div class="options">
          <button class="btn">
            <i class="fas fa-backspace"></i> Clear Note.
          </button>
          <textarea
            autocomplete="false"
            dir=""
            spellcheck="false"
            name=""
            id=""
            cols="20"
            rows="5"
          >
Your note...</textarea
          >
        </div>
        <div class="center">
          <button class="btn favorite">
            <i class="far fa-edit"></i> Edit Note
          </button>
          <button class="btn favorite">
            <i class="fa fa-trash"></i> Delete Advise
          </button>
        </div>
      </blockquote>
    </div>
    <button class="btn"><i class="fa fa-trash"></i> Trash</button>
      <button class="btn"><i class="far fa-heart"></i> favorite</button>
      <button class="btn"><i class="fas fa-random"></i> random</button>

    <div class="container">
      <blockquote class="blockquote color3">
        Creativity is just connecting things. When you ask creative people how
        they did something, they feel a little guilty because they didn't really
        do it, they just saw something. It seemed obvious to them after a while.
        That's because they were able to connect experiences they've had and
        synthesize new things.
        <span>ــ Steve Jobs</span>
        <div class="options">
          <button class="btn">
            <i class="fas fa-backspace"></i> Clear Note.
          </button>
          <textarea
            placeholder="Save it with Note."
            name=""
            id=""
            cols="20"
            rows="5"
          ></textarea>
        </div>
        <div class="center">
          <button class="btn favorite">
            <i class="far fa-heart"></i> favorite
          </button>
          <button class="btn favorite">
            <i class="fa fa-random"></i> favorite
          </button>
        </div>
      </blockquote>
    </div>
 */
