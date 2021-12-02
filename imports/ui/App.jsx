import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "./Advise";
import InsertAdvise from "./insertAdvise";
import FetchSavedAdvises from "./fetchSavedAdvises";
import FetchOneAdvise from "./fetchOneAdvise";
import SavedAdvises from "./savedAdvises";
import { useTracker } from "meteor/react-meteor-data";
import advisesCollection from "../../database/collections/advisesCollection";

export const App = () => {
  const { advs } = useTracker(() => {
    Meteor.subscribe("advises");
    let advs = [];
    advs = advisesCollection.find({}, { limit: 100 }).fetch();
    return { advs };
  });

  return (
    <>
      <InsertAdvise />
      {advs?.map((ad, i) => (
        <Advise advise={ad} id={ad._id} key={i} />
      ))}
    </>
  );
};

/**
 *
 */
