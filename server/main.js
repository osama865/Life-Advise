import { Meteor } from "meteor/meteor";
import taskCollection from "../database/collections/taskCollection";
import { Accounts } from "meteor/accounts-base";
import {check} from 'meteor/check';

Meteor.methods({
  'insertTask' : (text)=>{
    check(text , String)
    taskCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
    });
  },
  'removeTask' : function(id){
    check(id , String)
    if (!this.userId) {
      throw new Meteor.Error("not authorized")
    }
    const task = taskCollection.findOne({userId: this.userId})

    if (!task) {
      console.log(task);
      throw new Meteor.Error('Access denied.');
    }

    taskCollection.remove(id)
    console.log(`task with id ${id} removed`);
  },
  'updateTask' : function(id , isUpdated){
    check(id , String)
    check(isUpdated , Boolean)

    if (!this.userId) {
      throw new Meteor.Error("not authorized")
    }
    const task = taskCollection.findOne({userId: this.userId})

    if (!task) {
      console.log(task);
      throw new Meteor.Error('Access denied.');
    }

    taskCollection.update(id, {
      $set: {
        isChecked: isUpdated,
      },
    });
  },
  'insertTask' : function(text) {
    check(text , String)

    if (!this.userId) {
      throw new Meteor.Error("not authorized")
    }
    const task = taskCollection.findOne({userId: this.userId})

    if (!task) {
      console.log(task);
      throw new Meteor.Error('Access denied.');
    }


    taskCollection.insert({
      text: text,
      userId: this.userId,
      createdAt: new Date(),
    });
  }
})
// first define the insertion method

Meteor.startup(() => {
  // If there is no acc with the user name then create it
});

