import React from "react";
import { Meteor } from "meteor/meteor";

export default function Advise({ advise, id }) {
  const saveAdvise = () => {
    // add this advise to savedAdvises collection and do not ferget to add note when you save it
    console.log("add this advise to savedAdvises collection", advise);
    Meteor.call("saveAdvise", advise, id, (err, res) => {
      if (err) throw new Error(err);
      console.log(res);
    });
  };
  return (
    <>
      <h1>---------------------------</h1>
      <h2>{advise.text}</h2>
      <h4>{advise.source}</h4>
      <h5>{advise.date.toUTCString()}</h5>
      <button onClick={saveAdvise}>Save</button>
      <h1>---------------------------</h1>
    </>
  );
}
