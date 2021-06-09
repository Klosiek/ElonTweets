importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDbKv6Wvvd1Ilgl0MxfgJYoR5OXITAwphY",
  authDomain: "filtrelon.firebaseapp.com",
  databaseURL: "https://filtrelon-default-rtdb.firebaseio.com/",
  projectId: "filtrelon",
  storageBucket: "filtrelon.appspot.com",
  messagingSenderId: "557349282817",
  appId: "1:557349282817:web:cf8fe492a0963f1558cc00",
});

const messaging = firebase.messaging();

// https://stackoverflow.com/questions/62346048/click-on-push-notification-doesnt-open-new-url-every-time
messaging.onBackgroundMessage((payload) => {
  const title = payload.data.title;
  const url = payload.data.link;
  const notificationOptions = {
    body: payload.data.body,
    icon: "./filtrelon.png",
  };

  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow(url));
  });
  return self.registration.showNotification(title, notificationOptions);
});
