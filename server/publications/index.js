import { Meteor } from "meteor/meteor";
import advisesCollection, { savedAdvisesCollection } from "../../database/collections/advisesCollection";

Meteor.publish("advises", () => {
  return advisesCollection.find();
});
Meteor.publish("savedAdvises", () => {
  return savedAdvisesCollection.find();
});
