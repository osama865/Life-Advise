import { Meteor } from "meteor/meteor";

const publicVapidKey =
  "BJx9vRbDTiN1prIBCyMp0HfGSxQGLxdv2BisVam6tSdwGN_pt4gUarAQDYlHYNbtw_csFaZLkl20IlqXgkpe2Rc";

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
Meteor.startup(async () => {
  if (window.Notification) {
    Notification.requestPermission(() => {
      if (Notification.permission === "granted") {
        getSubscriptionObject().then(subscribe);
      }
    });
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

  function subscribe(subscription) {
    console.log(subscription, "subscription");
    const obj = {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    };
    console.log('kkkk', JSON.stringify(obj));
    return fetch(`http://localhost:3000/subscribe`,obj).catch((err) => {
      console.error(err);
    });
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

/**
 *
 */
