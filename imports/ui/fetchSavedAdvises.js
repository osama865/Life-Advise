import React, { useEffect, useState } from "react";
import SavedAdvises from "./savedAdvises";
import { useTracker } from "meteor/react-meteor-data";
//import { savedAdvisesCollection } from "../../database/collections/advisesCollection";
import { useIndexDB } from "./indexDB";

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

/**
|--------------------------------------------------
|
 const advs = useTracker(async () => {
    let advs = [];
    advs = await savedAdvisesDB.fetchAll();
    //setAdvises(advs)
    return advs;
  });
 useEffect(() => {
    savedAdvisesDB.fetchAll().then((res) => {
     setAdvises(res)
    });
  }, []);
|--------------------------------------------------
*/
