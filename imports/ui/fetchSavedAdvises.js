import React, { useEffect, useState } from "react";
import SavedAdvises from "./savedAdvises";
import { useTracker } from "meteor/react-meteor-data";
import { savedAdvisesCollection } from "../../database/collections/advisesCollection";
// import {MongoClient} from "mongodb"

export default function FetchSavedAdvises() {
  const [advises, setAdvises] = useState([]);

  const { advs } = useTracker(() => {
    Meteor.subscribe("savedAdvises");
    let advs = [];
    advs = savedAdvisesCollection.find().fetch();
    return { advs };
  });
  console.log(advs);
 
  return (
    <>
      {advs?.map((advise, i) => {
        return <SavedAdvises advise={advise} id={advise._id} key={i} />;
      })}
    </>
  );
}
