import { Meteor } from "meteor/meteor";
import "./methods";
import "./publications/index";
import "./notifications";

// generate VAPIDKEYS and store'em in database and then send'm to client
Meteor.startup(() => {});
