import { Mongo } from "meteor/mongo";
const local = 'Advises'
const remote = 'advices'
let collection = '';
if (process.env.NODE_ENV === "development") {
    collection = "Advises"
} else {
    collection = "advices"
}
export default advisesCollection = new Mongo.Collection(collection);
// advices for mogno atlas
// Advises for local mongo