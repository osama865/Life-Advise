import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";

export default function FetchOneAdvise() {
  const [skip, setSkip] = useState(0);
  const [advise, setAdvise] = useState({});
  const [end, seteEnd] = useState(false);
  useEffect(() => {
    fetchAdvise();
  }, []);

  const fetchAdvise = () => {
    Meteor.call("fetchOneAdvise", skip, (err, res) => {
      if (err) throw new Error('occured when fetching advise , check the skip aurg',err);
      if (res === undefined) {
        seteEnd(true);
        console.log("we dont have another advises");
      } else {
        setAdvise(res);
        setSkip((s) => skip + 1);
        console.log(res);
      }
    });
  };

  return (
    <div>
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
  );
}
