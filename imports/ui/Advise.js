import React from "react";
import { Meteor } from "meteor/meteor";

export default function Advise({ advise, id }) {
  const saveAdvise = () => {
    if (advise.saved === false) {
      // add this advise to savedAdvises collection and do not ferget to add note when you save it
      Meteor.call("saveAdvise", advise, id, (err, res) => {
        if (err) throw new Error(err);
        console.log(res);
      });
      Meteor.call("updateSave",id, (err) => {
        if (err) throw new Error(err);
      });
    } else {
      return;
    }
  };
  const savedOrNot = advise.saved === true ? "allready Saved" : "Save";

  return (
    <>
      <h1>---------------------------</h1>
      <h2>{advise.text}</h2>
      <h4>{advise.source}</h4>
      <h5>{advise.date.toUTCString()}</h5>
      <button onClick={saveAdvise}>{savedOrNot}</button>
      <h1>---------------------------</h1>
    </>
  );
}
