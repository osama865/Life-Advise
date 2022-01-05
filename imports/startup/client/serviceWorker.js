import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  navigator.serviceWorker
    .register("/sw.js")
    .then((worker) => {
      worker.showNotification('A new message!', {
        actions: [
          {
            action: 'show',
            title: 'Show it',
            icon: '/check.png'
          },
          {
            action: 'ignore',
            title: 'Ignore it',
            icon: '/delete.png'
          }
        ]
      });
      console.info("service worker registered")})
    .catch((error) => {
      console.log("ServiceWorker registration failed: ", error);
    });
});

self.addEventListener('notificationclick', () => {
  console.log('Clicked!');
});

/**
 *


 */
