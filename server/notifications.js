import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Picker } from "meteor/meteorhacks:picker";
import bodyParser from "body-parser";
import "./publications/index";
const webpush = require("web-push");

let VAPIDKEYS;
//let VAPIDKEYS = { publicKey: "", privateKey: "" };

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
  VAPIDKEYS = webpush.generateVAPIDKeys();
  console.log("vpids", VAPIDKEYS);
  const publicVapidKey = VAPIDKEYS.publicKey;
  const privateVapidKey = VAPIDKEYS.privateKey;
  console.log("call get method", VAPIDKEYS);

  Meteor.call("setVAPIDKEYS", VAPIDKEYS, "1", (err, res) => {
    if (err) {
      console.error(err);
    }
    console.log(res, "sssssssssssssssss");
  });

  Meteor.call("getVAPIDKEYS", "1", (err, res) => {
    if (err) {
      console.error(err);
    }
    webpush.setVapidDetails(
      "mailto:osama0000ibrahim@gmail.com",
      res.publicKey,
      res.privateKey
    );
    console.log(res, "ggggggggggggggggg");
  });

  Picker.middleware(bodyParser.urlencoded({ extended: false }));
  Picker.middleware(bodyParser.json());
  Picker.route("/subscribe", function (params, req, res, next) {
    const data = getAdvice();
    console.log(params ,'params ',req.body);
    let i = 0;
    const payload = JSON.stringify({
      title: `Hey, Your Advices for today!`,
      data,
    });
    setInterval(() => {}, 10000);
    webpush.sendNotification(req.body, payload);
  });
});
