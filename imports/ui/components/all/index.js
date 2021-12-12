import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Advise from "../Advise";
import advisesCollection from "../../../../database/collections/advisesCollection";
export default function FetchAllAdvises() {
  const { advs } = useTracker(() => {
    Meteor.subscribe("advises");
    let advs = [];
    advs = advisesCollection.find({}, { limit: 50 }).fetch();
    return { advs };
  });

  return (
    <>
      {advs?.map((ad, i) => (
        <Advise advise={ad} id={ad._id} key={i} />
      ))}
    </>
  );
}