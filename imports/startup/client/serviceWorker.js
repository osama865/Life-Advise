import { Meteor } from "meteor/meteor";
let registration ;
Meteor.startup( async() => {
  registration = await navigator.serviceWorker
    .register("/sw.js")
    .catch((error) => {
      console.log("ServiceWorker registration failed: ", error);
    });
    console.log(registration);
    function isPushSupported() {
      //checks if user has granted permission to Push notifications
      if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
      }
    
      //Checks if current browser supports Push notification
      if (!('PushManager' in self)) {
        alert('Sorry, Push notification isn\'t supported in your browser.');
        return;
      }
    
      //Get `push notification` subscription id
    
      //If `serviceWorker` is registered and ready
      navigator.serviceWorker.ready
        .then(function (registration) {
          console.log('hhhhhhhhhhhhhhhhhhhiiiiii');
          registration.pushManager.getSubscription()
          .catch(function (error) {
            console.error('Error occurred while enabling push ', error);
          });
        });
    }
    isPushSupported()
  
   
});

export default registration
/**
 *
 */
