import Advise from "../Advise";
import React from "react";

let permission = Notification.requestPermission();
const notifyUser = (advise) => {
  const actions = [
    
  ]
  const option = {
    body: advise.text,
    dir: advise.language === "en" ? "ltr" : "rtl",
    lang: advise.language || "en",
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions ,
  };
  const notification = new Notification("Your Advices for today", option);
  notification.addEventListener("click", function () {
    window.open("http://localhost:3000/notify", "_blank");
  });
};

export function Notify(advise) {
  return (
    <>
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
      helloooooooooooooooooooooooooooooooooooooooooooooooooo
    </>
  );
}

export default notifyUser;
/**greeting.addEventListener('click', () => {
    window.open('http://localhost:3000/random', '_blank');
});
 * actions?: NotificationAction,
    badge?: string,
    body?: string,
    data?: any,
    dir?: NotificationDirection,
    icon?: string,
    image?: string,
    lang?: string,
    renotify?: boolean,
    requireInteraction?: boolean,
    silent?: boolean,
    tag?: string,
    timestamp?: DOMTimeStamp,
    vibrate?: VibratePattern
 */
