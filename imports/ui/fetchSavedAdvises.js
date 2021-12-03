import React, { useEffect, useState } from "react";
import SavedAdvises from "./savedAdvises";
import { useTracker } from "meteor/react-meteor-data";
//import { savedAdvisesCollection } from "../../database/collections/advisesCollection";
import { useIndexDB } from "./indexDB";

const savedAdvisesDB = useIndexDB("advises");
export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);
  const { advs } = useTracker(async () => {
    Meteor.subscribe("savedAdvises");
    let advs = [];
    advs = advises
    console.log(advs , '0000000000000000');
    return { advs };
  });

  useEffect(() => {
    savedAdvisesDB.fetchAll().then((res) => {
     setAdvises(res)
    });
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
|--------------------------------------------------
*/

