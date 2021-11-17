import React, { useContext, useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "./Advise";
import InsertAdvise from "./insertAdvise";
import FetchSavedAdvises from "./fetchSavedAdvises";
import { advisesContext } from "../context/context";
import FetchOneAdvise from "./fetchOneAdvise";
import Advises from "./advises";
import SavedAdvises from "./savedAdvises";

export const App = () => {
  const [advises, setAdvises] = useState([]);
  useEffect(() => {
    Meteor.call("fetchAllAdvises", (err, res) => {
      if (err) throw new Error(err);
      setAdvises(res);
    });
    Meteor.call("fetchOneAdvise", 5, (err, res) => {
      if (err) throw new Error(err);
    });
  }, []);

  return (
    <>
      <InsertAdvise />
      <FetchOneAdvise />
      <div>
        {advises?.map((advise, i) => {
          return <Advise advise={advise} id={advise._id} key={i} />;
        })}
      </div>
      <FetchSavedAdvises />
    </>
  );
};

/*
   * here some advises
      favs start
      
      <InsertAdvise />
      <Advises />
      <FetchOneAdvise />
  */
