import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Advise from "./Advise";
import InsertAdvise from "./insertAdvise";
import Favorites from "./favorites";
import FetchSavedAdvises from "./fetchSavedAdvises";
import { advisesContext } from "../context/context";
import FetchOneAdvise from "./fetchOneAdvise";

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

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noData = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user) {
      return noData;
    }

    const handler = Meteor.subscribe("tasks");

    if (!handler.ready) {
      return { ...noData, isLoading: true };
    }

    const tasks = taskCollection
      .find(hideCopmleted ? hideCompletedFilter : userFilter, {
        sort: { createdAt: -1 },
      })
      .fetch();
    const pendingTasksCount = useTracker(() =>
      taskCollection.find(hideCompletedFilter).count()
    );

    return { tasks, pendingTasksCount };
  });
  const {trackedAdvises} = useTracker(()=>{
    let trackedAdvises ;
    Meteor.call("fetchAllAdvises", (err, res) => {
      if (err) throw new Error(err);
      trackedAdvises = res
    });
    return trackedAdvises
  },[])
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

  Meteor.call('fetchOneAdvise',(err, res) => {
    if (err) throw new Error(err);
    console.log(res);
  })

  return (
    <>
      <FetchOneAdvise />
    </>
  );
};
