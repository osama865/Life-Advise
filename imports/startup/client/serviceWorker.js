import { Meteor } from "meteor/meteor";

Meteor.startup(async () => {
  navigator.serviceWorker.register("/sw.js");

  let publicVapidKey;

  let s = await Meteor.call("getVAPIDKEYS", "1");
  Meteor.call("getVAPIDKEYS", "1", (err, res) => {
    if (err) {
      console.error(err);
    }
    publicVapidKey = res.publicKey;
    console.log(publicVapidKey, "kkkkkkkkk");
    if (window.Notification) {
      Notification.requestPermission(() => {
        if (Notification.permission === "granted") {
          getSubscriptionObject().then(subscribe);
        }
      });
    }
  });

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function getSubscriptionObject() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      return await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
    } catch (error) {
      console.log("ServiceWorker registration failed: ", error);
    }
  }

  async function subscribe(subscription) {
    console.log(subscription, "subscription");
    const obj = {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      return fetch(`http://localhost:3000/subscribe`, obj);
    } catch (err) {
      console.error(err);
    }
  }

  function isPushSupported() {
    //checks if user has granted permission to Push notifications
    if (Notification.permission === "denied") {
      alert("User has blocked push notification.");
      return;
    }

    //Checks if current browser supports Push notification
    if (!("PushManager" in self)) {
      alert("Sorry, Push notification isn't supported in your browser.");
      return;
    }

    //Get `push notification` subscription id

    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready.then(function (registration) {
      console.log("hhhhhhhhhhhhhhhhhhhiiiiii");
      registration.pushManager.getSubscription().catch(function (error) {
        console.error("Error occurred while enabling push ", error);
      });
    });
  }
  isPushSupported();
});
