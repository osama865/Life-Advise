import React, { useEffect, useState, useCallback, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Advise from "../Advise";
import advisesCollection from "../../../../database/collections/advisesCollection";
import customHook from "./customHook";
("./customHook");

function coloring() {
  let colorNumber;
  colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
  if (colorNumber > 4 || colorNumber <= 0) {
    colorNumber = 3;
  }
  return colorNumber;
}

export default function FetchAllAdvises() {
  const [advises, setAdvises] = useState([]);
  let advs = [];
  advs = useTracker(() => {
    Meteor.subscribe("advises");
    advs = advisesCollection.find({}, { limit: 5 }).fetch();
    return advs;
  });

  const { last, result } = customHook();

  useEffect(() => {
    setAdvises((prev) => {
      return [...new Set([...prev, ...result])];
    });
  }, [result]);

  return (
    <div className="container1">
      {advs?.map((ad, i) => {
        if (i + 1 === advs.length) {
          return (
            <div key={i} ref={last}>
              <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
            </div>
          );
        } else {
          return <Advise advise={ad} id={ad._id} key={i} color={coloring()} />;
        }
      })}
      {advises?.map((ad, i) => {
        if (i + 1 === advises.length) {
          return (
            <div key={i} ref={last}>
              <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
            </div>
          );
        } else {
          return <Advise advise={ad} id={ad._id} key={i} color={coloring()} />;
        }
      })}
    </div>
  );
}
