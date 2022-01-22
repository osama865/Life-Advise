import { Mongo } from "meteor/mongo";

export default advisesCollection = new Mongo.Collection("advices") || new Mongo.Collection("Advices");