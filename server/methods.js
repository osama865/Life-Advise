import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import advisesCollection from "../database/collections/advisesCollection";

Meteor.methods({
  // insert an advise
  insertAdvise: (advise) => {
    check(advise, Object);
    return advisesCollection.insert(advise);
  },
  // fetch all advises from advises collection
  fetchAllAdvises: () => {
    return advisesCollection.find({}, { limit: 100 }).fetch();
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
  fetchByScroll: (skip) => {
    console.log(skip);
    return advisesCollection.find({}, { limit: 10, skip: skip }).fetch();
  },
});
