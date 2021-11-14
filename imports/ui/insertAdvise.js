import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

// use tracker for meteor calls
export default function InsertAdvise() {
  const [advise, setAdvise] = useState("");
  const [source, setSource] = useState("");
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
          source: source.toString(),
          saved: false,
          date: new Date(),
          index: count,
          language,
        },
        (err, res) => {
          if (err) throw new Error(err);
          Meteor.call("testFetchOneAdvise", res, (err, res) => {
            console.log(res);
          });
          Meteor.call("fetchFirstAdvise", (err, res) => {
            // console.log(res);
          });
          Meteor.call("fetchLastAdvise", (err, res) => {
            // console.log(res);
          });
        }
      );
    }
    // clear states
    setAdvise("");
    setSource("");
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
          value={source}
          placeholder="Type it's source"
          onChange={(e) => setSource(e.target.value)}
        />
        <button onClick={handleInsert}>Insert it</button>
      </form>
    </>
  );
}
