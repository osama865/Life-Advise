import { Meteor } from "meteor/meteor";
import "./methods";
import "./publications/index";
<<<<<<< HEAD

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
  fetchByScroll: (skip) => {
    console.log(skip);
    return advisesCollection.find({}, { limit: 10, skip: skip }).fetch();
  },
});
=======
import "./notifications";
>>>>>>> notifications

// generate VAPIDKEYS and store'em in database and then send'm to client
Meteor.startup(() => {});
