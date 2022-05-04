import { Meteor } from "meteor/meteor";
import advisesCollection, { savedAdvisesCollection } from "../../database/collections/advisesCollection";

let collection = '';
if (process.env.NODE_ENV === "development") {
    collection = "Advises"
} else {
    collection = "advices"
}

Meteor.publish(collection, () => {
  return advisesCollection.find();
});
Meteor.publish("savedAdvises", () => {
  return savedAdvisesCollection.find();
});
