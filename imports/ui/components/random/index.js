import React, { Suspense, useEffect, useRef, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "../Advise";

let s = 0;
let i = 0;

// fix this shit later
export default function FetchOneAdvise() {
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [advise, setAdvise] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [end, seteEnd] = useState(false);

  const shuffle = (max) => {
    // order
    let arr = [];
    for (let i = 0; i < max; i++) {
      arr[i] = i;
    }
    let tempArr = arr.reverse();
    // shuffle
    tempArr.sort((a, b) => 0.5 - Math.random());
    setIndexes(tempArr);
  };

  function coloring() {
    let colorNumber;
    colorNumber = Math.floor(Math.abs(Math.random() * 10 - 4));
    if (colorNumber > 4 || colorNumber <= 0) {
      colorNumber = 3;
    }
    return colorNumber;
  }

  function increment() {
    s = indexes[i];
    if (s === undefined) {
      return;
    }
    i++;
    return s;
  }

  const fetchAdvise = async () => {
    setAdvise([]);
    if (navigator.onLine === true) {
      if (i < count ) {
      Meteor.call("fetchOneAdvise", increment(), (err, res) => {
        if (err)
          throw new Error(
            "occured when fetching advise , check the skip arg",
            err
          );
        if (res === undefined) {
          seteEnd(true);
          return;
        } else {
          setAdvise((prev) => {
            return [...new Set([...prev, res])];
          });
        }
      });
      Meteor.call("fetchOneAdvise", increment(), (err, res) => {
        if (err)
          throw new Error(
            "occured when fetching advise , check the skip arg",
            err
          );
        if (res === undefined) {
          seteEnd(true);
          return;
        } else {
          setAdvise((prev) => {
            return [...new Set([...prev, res])];
          });
        }
      });
    } else {
      seteEnd(true);
      i = s = 0;
    }
    } else {
      window.location.href="#no-internet"
    }
    
  };

  useEffect(() => {
    Meteor.call("countAdvises", (err, res) => {
      setCount(res);
    });
    if (indexes !== undefined || indexes.length !== 0) {
      fetchAdvise();
    }
    seteEnd(false);
  }, [indexes]);

  useEffect(() => {
    shuffle(count);
  }, [count]);

  return (
    <div className="random">
      {end === true ? (
        <h1>we dont have another advises</h1>
      ) : (
        <>
          {advise?.map((ad, i) => (
            <Advise advise={ad} id={ad._id} key={i} color={coloring()} />
          ))}
          {skip !== undefined && (
            <div className="center">
              <button onClick={fetchAdvise} className="btn favorite">
                <i className="fas fa-comment-alt"></i> Get More Advices
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
