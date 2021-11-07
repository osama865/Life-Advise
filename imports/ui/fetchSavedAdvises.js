import React, { useEffect, useState } from "react";
import SavedAdvises from "./savedAdvises";

export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);

  useEffect(() => {
    Meteor.call("fetchSavedAdvises", (err, res) => {
      if (err) throw new Error(err);
      setAdvises([]);
      setAdvises(res);
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
