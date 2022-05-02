import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import SavedAdvises from "../saved-advise";
import { useIndexDB } from "../../../../database/client/indexDB";

const savedAdvisesDB = useIndexDB("advises");
export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);

  useEffect(() => {
    let advs = [];
    savedAdvisesDB.find().then((res) => {
      setAdvises(res)
    })
  },[]);

  function coloring() {
    let colorNumber;
    colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
    if (colorNumber > 4 || colorNumber <= 0) {
      colorNumber = 3;
    }
    return colorNumber;
  }

  return (
    <div className="container1" >
      {advises?.map((advise, i) => {
        return <SavedAdvises advise={advise} _id={advise._id} key={i} color={coloring()} />;
      })}
    </div>
  );
}
