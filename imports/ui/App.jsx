import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import advisesCollection from "../../database/collections/advisesCollection";
import Advise from "./Advise";
import InsertAdvise from "./insertAdvise";
import Favorites from "./favorites";

/**
   * list all the fetched advises on local storage for user and when we want 
   * to fetch new advise it will be compared with those in local storage to prevent 
   * duplicate adivses
   * localStorage.setItem("username" , "osama ibrahim")
  
  console.log(localStorage.getItem("username").localeCompare('osama ibrahim'));
  if (!localStorage.getItem("username").localeCompare('osama ibrahim')) {
    console.log('they are matched');
  } else {
    console.log('no match');
  }
*/



export const App = () => {
  const [advises, setAdvises] = useState([
    {
      text: "life is short , enjoy it",
      source: "osama.",
      date: new Date(),
    },
    {
      text: "life is short , enjoy it",
      source: "osama.",
      date: new Date(),
    },
    {
      text: "life is short , enjoy it",
      source: "osama.",
      date: new Date(),
    },
    {
      text: "life is short , enjoy it",
      source: "osama.",
      date: new Date(),
    },
    {
      text: "life is short , enjoy it",
      source: "osama.",
      date: new Date(),
    },
  ]);
  useEffect(() => {
    Meteor.call("fetchAllAdvises", (err, res) => {
      if (err) throw new Error(err);
      setAdvises(res);
    });
    
  }, []);

  return (
    <>
      here some advises
      <InsertAdvise />
      favs start
      <Favorites />
      favs end
      <div>
        {advises?.map((advise, i) => {
          return <Advise advise={advise} key={i} />;
        })}
      </div>
    </>
  );
};
