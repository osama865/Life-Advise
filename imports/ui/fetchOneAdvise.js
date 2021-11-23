import React, { Suspense, useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "./Advise";

// fetching one advise per lang by time done just need som cleaning

export default function FetchOneAdvise() {
  const [skip, setSkip] = useState(0);
  const [advise, setAdvise] = useState([]);
  const [end, seteEnd] = useState(false);

  const fetchAdvise = () => {
    setAdvise([])
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
  };

  useEffect(() => {
    fetchAdvise();
  }, []);

  return (
    <>
      hello
      <div>
        {end === true ? (
          <h1>we dont have another advises</h1>
        ) : (
          <div>
            {advise?.map((ad, i) => (
              <Advise advise={ad} id={ad._id} key={i} />
            ))}
            <button onClick={fetchAdvise}>fetch advise</button>
          </div>
        )}
      </div>
    </>
  );
}
