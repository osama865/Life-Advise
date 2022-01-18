import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
const webpush = require("web-push");
import { Picker } from "meteor/meteorhacks:picker";
import bodyParser from "body-parser";

const publicVapidKey =
  "BJx9vRbDTiN1prIBCyMp0HfGSxQGLxdv2BisVam6tSdwGN_pt4gUarAQDYlHYNbtw_csFaZLkl20IlqXgkpe2Rc";
const privateVapidKey = "IZZoteSW4z67JQfFmYTQH5XeHPHmp-A92f5DYFMzsPM";

webpush.setVapidDetails(
  "mailto:osama0000ibrahim@gmail.com",
  publicVapidKey,
  privateVapidKey
);

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

Picker.middleware(bodyParser.urlencoded({ extended: false }));
Picker.middleware(bodyParser.json());
Picker.route("/subscribe", function (params, req, res, next) {
  const data = getAdvice();
  let i = 0;
  const payload = JSON.stringify({
    title: `Hey, Your Advices for today!`,
    data,
  });
  setInterval(() => {}, 10000);
  webpush.sendNotification(req.body, payload);
});
