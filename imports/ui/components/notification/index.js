let permission = Notification.requestPermission();
const notifyUser = (advise) => {
  
  const option = {
    body: advise.text,
    dir: advise.language === "en" ? "ltr" : "rtl",
    lang: advise.language,
  };
  //const greeting = new Notification("Your Advices for today", option);
  console.log(advise);
};

export default notifyUser;
/**greeting.addEventListener('click', () => {
    window.open('http://localhost:3000/random', '_blank');
});
 * actions?: action: string;
    icon?: string;
    title: string;
    ,
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
