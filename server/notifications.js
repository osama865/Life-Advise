import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Picker } from "meteor/meteorhacks:picker";
import bodyParser from "body-parser";
import "./publications/index";
const webpush = require("web-push");

function rand() {
  let max = 0,
    min = 0;
  max = Meteor.call("countAdvises");
  let randNumb = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randNumb, "lllllllll");
  return randNumb;
}

const getAdvice = () => {
  const advice = Meteor.call("fetchOneAdvise", rand());
  return advice;
};

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use("/random-fetch", (req, res, next) => {
  res.writeHead(200);
  let data = JSON.stringify(getAdvice());
  res.end(data);
});

Meteor.startup(() => {
  // generate vapid keys and store'em in db with id "1"
  let VAPIDKEYS = webpush.generateVAPIDKeys();

  Meteor.call("setVAPIDKEYS", VAPIDKEYS, "1", (err, res) => {
    if (err) {
      throw new Error(err);
    }
  });

  Meteor.call("getVAPIDKEYS", "1", (err, res) => {
    if (err) {
      throw new Error(err);
    }
    webpush.setVapidDetails(
      "mailto:osama0000ibrahim@gmail.com",
      res.publicKey,
      res.privateKey
    );
  });

  Picker.middleware(bodyParser.urlencoded({ extended: false }));
  Picker.middleware(bodyParser.json());
  Picker.route("/subscribe", function (params, req, res, next) {
    const data = getAdvice();
    let i = 0;
    const payload = JSON.stringify({
      title: `Hey, Your Advices for today!`,
      data,
    });
    setInterval(() => {
      webpush.sendNotification(req.body, payload);
    }, 1000 * 60 * 10);
  });
});
