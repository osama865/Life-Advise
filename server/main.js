import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import advisesCollection, {
  savedAdvisesCollection,
} from "../database/collections/advisesCollection";

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
    return advisesCollection.find({}).fetch();
  },
  // return the count of advises
  countAdvises: () => {
    return advisesCollection.find({}).count();
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
    return advisesCollection.findOne({language : 'en'}, { skip });
  },
  fetchOneArAdvise: ( skip) => {
    check(skip, Number);
    return advisesCollection.findOne({language : 'ar'}, { skip });
  },
  // return the FirstAdvise
  fetchFirstAdvise: () => {
    return advisesCollection.findOne({}, { sort: { date: 1 } });
  },
  // return en Advise
  fetchEnglishAdvises: () => {
    console.log('hey');
    return advisesCollection.find({language : 'en'}).fetch();
  },
  // return ar Advise
  fetchArabicAdvises: () => {
    console.log('hey');
    return advisesCollection.find({language : 'ar'}).fetch();
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
  // clean it later
  insertSavedAdvises: (savedAdvises) => {
    savedAdvises.map((advise) => {
      savedAdvisesCollection.insert(advise, (err, res) => {
        if (err) throw new Error(err);
      });
    });
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
  saveAdvise: (advise) => {
    check(advise, Object);
    // or i can rescieve all the advise properties from client (_id , saved exluded)
    // clone it
    const adviseToSave = advise;
    delete adviseToSave._id;
    delete adviseToSave.saved;
    // add note property
    adviseToSave.note = "note about this advise";
    // then assemble it here and insert it to savedAdvisesCollection
    return savedAdvisesCollection.insert(adviseToSave);
  },
  // save an advise to saved collection
  updateSave: (_id) => {
    check(_id, String);
    return advisesCollection.update({ _id }, { $set: { saved: true } });
  },
});

Meteor.startup(() => {});
