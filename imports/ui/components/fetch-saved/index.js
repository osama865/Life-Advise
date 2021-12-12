import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import SavedAdvises from "../saved-advise";
import { useIndexDB } from "../../../../database/client/indexDB";

const savedAdvisesDB = useIndexDB("advises");
export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);

  useEffect(async () => {
    let advs = [];
    advs = await savedAdvisesDB.fetchAll();
    setAdvises(advs);
  }, []);

  return (
    <>
      here is favorite advises
      {advises?.map((advise, i) => {
        return <SavedAdvises advise={advise} _id={advise._id} key={i} />;
      })}
    </>
  );
}