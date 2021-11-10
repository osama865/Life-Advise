import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import advisesCollection, {
  savedAdvisesCollection,
} from "../database/collections/advisesCollection";

Meteor.methods({
  insertAdvise: (advise) => {
    check(advise, Object);
    return advisesCollection.insert(advise);
  },
  fetchAdviseDaily: () => {},
  fetchAllAdvises: () => {
    return advisesCollection.find({}).fetch();
  },
  fetchOneAdvise: (skip) => {
    check(skip , Number)
    return advisesCollection.findOne({}, {skip});
  },
  insertSavedAdvises: (savedAdvises) => {
    savedAdvises.map((advise) => {
      savedAdvisesCollection.insert(advise, (err, res) => {
        if (err) throw new Error(err);
      });
    });
  },
  fetchSavedAdvises: () => {
    return savedAdvisesCollection.find({}).fetch();
  },
  updateNote: (updatedNote, _id) => {
    check(updatedNote, String);
    check(_id, String);
    return savedAdvisesCollection.update(
      { _id },
      { $set: { note: updatedNote } }
    );
  },
  deleteAdvise: (_id) => {
    check(_id, String);
    return savedAdvisesCollection.remove({ _id });
  },
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
  updateSave: (_id) => {
    check(_id, String);
    return advisesCollection.update({ _id }, { $set: { saved: true } });
  },
  logIds: () => {
    let ids = [];
    ids = advisesCollection.find({}, { _id: 1 }).map((advise) => advise._id);
    console.log(ids[4]);
    for (let i = 0; i < ids.length; i++) {
      //console.log(ids[i]);
      // i got all the ids for my docs
      // now i should insert it into new collection
    }
  },
  collectIds: (_id) => {
    check(_id, String);
    advisesCollection.update({ _id }, { $set: { saved: true } });
  },
});

Meteor.call("logIds", (err, res) => {
  if (err) throw new Error(err);
});

// adviseId
// id
// collections for ids its id = 0,1,2,... etc
// fetch random number and get an id and then fetch tha advise with that id
Meteor.startup(() => {});
