import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import advisesCollection, {
  savedAdvisesCollection,
} from "../database/collections/advisesCollection";
import "./publications/index";
const fs = require("fs");

Meteor.methods({
  // insert an advise
  insertAdvise: (advise) => {
    check(advise, Object);
    return advisesCollection.insert(advise);
  },
  // fetch an advise daily (not yet)
  fetchAdviseDaily: () => {},
  // fetch all advises from advises collection
  fetchAllAdvises: () => {
    return advisesCollection.find({},{limit : 100}).fetch();
  },
  // return the count of advises
  countAdvises: () => {
    return advisesCollection.find().count();
  },
  // fetch advises one by one
  // must change the name to fetch by skip or anything
  fetchOneAdvise: (skip) => {
    check(skip, Number);
    return advisesCollection.findOne({}, { skip });
  },
  // change the name later
  fetchOneEnAdvise: (skip) => {
    check(skip, Number);
    return advisesCollection.findOne({ language: "en" }, { skip });
  },
  fetchOneArAdvise: (skip) => {
    check(skip, Number);
    return advisesCollection.findOne({ language: "ar" }, { skip });
  },
  // return the FirstAdvise
  fetchFirstAdvise: () => {
    return advisesCollection.findOne({}, { sort: { date: 1 } });
  },
  // return en Advise
  fetchEnglishAdvises: () => {
    console.log("hey");
    return advisesCollection.find({ language: "en" }).fetch();
  },
  // return ar Advise
  fetchArabicAdvises: () => {
    console.log("hey");
    return advisesCollection.find({ language: "ar" }).fetch();
  },
  // return the LastAdvise
  fetchLastAdvise: () => {
    return advisesCollection.findOne({}, { sort: { date: 1 } });
  },
  // fetch an advise with id
  testFetchOneAdvise: (_id) => {
    check(_id, String);
    return advisesCollection.findOne({ _id });
  },
  // fetch all advises from saved collection
  fetchSavedAdvises: () => {
    return savedAdvisesCollection.find({}).fetch();
  },
  // edit note
  updateNote: (updatedNote, _id) => {
    check(updatedNote, String);
    check(_id, String);
    return savedAdvisesCollection.update(
      { _id },
      { $set: { note: updatedNote } }
    );
  },
  // remove advise
  deleteAdvise: (_id) => {
    check(_id, String);
    return savedAdvisesCollection.remove({ _id });
  },
  // save an advise to saved collection
  // need more optimisation by moving more logic to client
  saveAdvise: (advise) => {
    check(advise, Object);
    const adviseToSave = advise;
    delete adviseToSave.saved;
    return savedAdvisesCollection.insert(adviseToSave);
  },
  // save an advise to saved collection
  updateSave: (_id) => {
    check(_id, String);
    return advisesCollection.update({ _id }, { $set: { saved: true } });
  },
  // reset save to unsave
  resetSave: (_id) => {
    check(_id, String);
    return advisesCollection.update({ _id }, { $set: { saved: false } });
  },
  saved: (_id) => {
    if (_id) {
      check(_id, String);
      const s = advisesCollection.findOne({ _id });
      return s.saved;
    }
  },
});
Meteor.startup(() => {});

/**
|--------------------------------------------------
| 
const path = "/home/osama/Desktop/Meteors/Life/imports/api/all2.json";
const encode = "utf-8";

const readFile = () => {
  const data = fs.readFileSync(path, encode);
  return data;
};

const fetchedData = JSON.parse(readFile())

const toAdvise = (arr) => {
  let advises = []
  let c = 0
  arr.forEach((element) => {
    const { text, author, language } = element;
    const ad = {
      text,
      author,
      date: new Date(),
      index: c,
      language,
    };
    advises.push(ad)
    Meteor.call("insertAdvise" , ad)
    c = c + 1
  });
  return advises
};

fs.writeFileSync(
    "/home/osama/Desktop/Meteors/Life/imports/api/test3.json",
    JSON.stringify(toAdvise(fetchedData))
);


console.log('successed');
|--------------------------------------------------
*/
