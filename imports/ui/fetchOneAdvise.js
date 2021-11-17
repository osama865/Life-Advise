import React, { Suspense, useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "./Advise";

// fetching one advise per lang by time done just need som cleaning

export default function FetchOneAdvise() {
  const [skip, setSkip] = useState(0);
  const [advise, setAdvise] = useState([]);
  const [end, seteEnd] = useState(false);

  const fetchAdvise = () => {
    setAdvise([]);
    Meteor.call("fetchOneEnAdvise", skip, (err, res) => {
      if (err)
        throw new Error(
          "occured when fetching advise , check the skip arg",
          err
        );
      if (res === undefined) {
        seteEnd(true);
      } else {
        setAdvise((prev) => {
          return [...new Set([...prev, res])];
        });
      }
    });
    Meteor.call("fetchOneArAdvise", skip, (err, res) => {
      if (err)
        throw new Error(
          "occured when fetching advise , check the skip arg",
          err
        );
      if (res === undefined) {
        seteEnd(true);
      } else {
        setAdvise((prev) => {
          return [...new Set([...prev, res])];
        });
      }
    });
    setSkip((p) => p + 1);
    console.log("advise.push(res)", advise);
  };

  useEffect(() => {
    setAdvise([]);
    fetchAdvise();
  }, []);
  /**
  |--------------------------------------------------
  |  <div>
        {end === true ? (
          <h1>we dont have another advises</h1>
        ) : (
          <>
            <h3>
              my job is to fetch one advise by time and give the chance to fetch
              more advises
            </h3>
            <h2>{advise.text}</h2>
            <h4>{advise.source}</h4>
            <button onClick={fetchAdvise}>fetch advise</button>
          </>
        )}
      </div>
  |--------------------------------------------------
  */

  return (
    <>
      hello
      <div>
        {end === true ? (
          <h1>we dont have another advises</h1>
        ) : (
          <div>
            {advise?.map((ad, i) => (
              <Advise advise={ad} key={i} />
            ))}
            <button onClick={fetchAdvise}>fetch advise</button>
          </div>
        )}
      </div>
    </>
  );
}
