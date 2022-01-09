function subscribe() {
  if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
    console.log("Notifications aren't supported.");
    return;
  }

  console.log("dfllllll");

  if (Notification.permission === "denied") {
    console.log("The user has blocked notifications.");
    return;
  }

  if (!("PushManager" in window)) {
    console.log("Push messaging isn't supported.");
    return;
  }
  navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager
      .subscribe({ userVisibleOnly: true })
      .then(function (subscription) {
        if (
          subscription.endpoint.startsWith(
            "https://android.googleapis.com/gcm/send"
          )
        ) {
          var parts = subscription.endpoint.split("/");
          var registrationId = parts[parts.length - 1];
          console.log("RegistrationId:");
          console.log(registrationId);
        }
      })
      .catch(function (e) {
        console.log("Something unfortunate happened: " + e);
      });
  });
}
subscribe();
