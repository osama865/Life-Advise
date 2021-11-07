import {Mongo} from "meteor/mongo"

export default advisesCollection = new Mongo.Collection('Advises')
savedAdvisesCollection = new Mongo.Collection('SavedAdvises')
export {savedAdvisesCollection}