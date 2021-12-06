import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

// use tracker for meteor calls
export default function InsertAdvise() {
  const [advise, setAdvise] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("en");

  const handleInsert = (e) => {
    Meteor.call("countAdvises", (err, res) => {
      insert(res);
    });
    e.preventDefault();
    // insert the advise
    function insert(count) {
      Meteor.call(
        "insertAdvise",
        {
          text: advise.toString(),
          author: author.toString(),
          saved: false,
          date: new Date(),
          index: count,
          language,
        },
        (err, res) => {
          if (err) throw new Error(err);
        }
      );
    }
    // clear states
    setAdvise("");
    setAuthor("");
  };

  const changeLangauge = (e) => {
    e.preventDefault();
    language === "en" ? setLanguage("ar") : setLanguage("en");
  };
  return (
    <>
      <form>
        <button onClick={changeLangauge}>language : {language}</button>
        <input
          value={advise}
          placeholder="Type an Advise"
          onChange={(e) => setAdvise(e.target.value)}
        />
        <input
          value={author}
          placeholder="Type it's author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleInsert}>Insert it</button>
      </form>
    </>
  );
}
