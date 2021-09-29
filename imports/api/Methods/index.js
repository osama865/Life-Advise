import {Meteor } from 'meteor/meteor'
import {check} from 'meteor/check';

Meteor.methods({add(a , b){
    check(a , [Number])
    check(b , [Number])

    return a + b ;
}})