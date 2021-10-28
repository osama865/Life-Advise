import { Meteor } from "meteor/meteor";
import {check} from 'meteor/check';
import advisesCollection from "../database/collections/advisesCollection";

Meteor.methods({
  "insertAdvise" : (advise)=>{
      check(advise , Object)
    advisesCollection.insert(advise)
  },
  "fetchAdviseDaily" : ()=>{

  },
  "fetchAllAdvises" : () => {
    return advisesCollection.find({}).fetch()
  },
  "fetchOneAdvise" : ()=>{
    return advisesCollection.findOne()
  }
})


Meteor.startup(() => {

});

