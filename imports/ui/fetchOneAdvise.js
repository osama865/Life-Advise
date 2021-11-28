import React, { Suspense, useEffect, useRef, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "./Advise";

let s = 0;
let i = 0;
export default function FetchOneAdvise() {
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [advise, setAdvise] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [end, seteEnd] = useState(false);

  const shuffle = (max) => {
    console.log(max, "max");
    // order
    let arr = [];
    for (let i = 0; i < max; i++) {
      arr[i] = i;
    }
    let tempArr = arr.reverse();
    // shuffle
    tempArr.sort((a, b) => 0.5 - Math.random());
    setIndexes(tempArr);
    // log it in order
  };

  function increment() {
    console.log(indexes, "indexes array");
    s = indexes[i];
    if (s === undefined) {
      return;
    }
    i++;
    return s;
  }

  const fetchAdvise = async () => {
    setAdvise([]);
    if (indexes.length -1 <= count) {
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
      seteEnd(true)
    }
  };

  useEffect(() => {
    Meteor.call("countAdvises", (err, res) => {
      setCount(res +1);
    });
    console.log("whos first ? me fetching ");
    console.log(skip, "skipping");
    fetchAdvise();
    seteEnd(false);
  }, [indexes]);

  useEffect(() => {
    console.log("whos first ? me shuffle ");
    shuffle(count);
  }, [count]);

  //useEffect(()=>{})
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
            {skip !== undefined && (
              <button onClick={fetchAdvise}>fetch advise</button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/**
|--------------------------------------------------
| setSkip(shuffled[temp]);
    if (temp >= count) {
      return;
    }
    
    console.log("shuffled", shuffled[temp]);
    console.log(skip);
    console.log("temp ", temp);
|--------------------------------------------------
*/
/**
  |--------------------------------------------------
  | setAdvise([]);
    setAdvise([]);
    Meteor.call("fetchOneAdvise", indexes[i], (err, res) => {
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
  |--------------------------------------------------
  */

// order an array
// reorder it
// use its values as skip parameters (random numbers)
