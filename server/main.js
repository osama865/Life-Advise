import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import advisesCollection, {
  savedAdvisesCollection,
} from "../database/collections/advisesCollection";

Meteor.methods({
  insertAdvise: (advise) => {
    check(advise, Object);
    advisesCollection.insert(advise);
  },
  fetchAdviseDaily: () => {},
  fetchAllAdvises: () => {
    return advisesCollection.find({}).fetch();
  },
  fetchOneAdvise: () => {
    return advisesCollection.findOne();
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
    advisesCollection.update({ _id }, { $set: { saved: true } });
  },
});

Meteor.startup(() => {});
