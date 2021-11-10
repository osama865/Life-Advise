import React, { useEffect, useState } from "react";
import SavedAdvises from "./savedAdvises";

// import {MongoClient} from "mongodb"

/*
  |--------------------------------------------------
  | the local db for user
  | add advises and compare them later with new fetched advises
  | will create another collection for user's saved advised for saved page
  | remove a advises/quotes from the list
  | const clientDB = new MongoClient.connect('advises')
  | meteor npm install --save mongodb
  |--------------------------------------------------
*/

export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);

  useEffect(() => {
    Meteor.call("fetchSavedAdvises", (err, res) => {
      if (err) throw new Error(err);
      setAdvises([]);
      setAdvises(res);
      console.log(res);
    });
  }, []);
  return (
    <>
      {advises?.map((advise, i) => {
        return <SavedAdvises advise={advise} id={advise._id} key={i} />;
      })}
    </>
  );
}
