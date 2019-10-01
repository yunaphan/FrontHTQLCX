importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '1039388797015'
});

var messaging = firebase.messaging();

self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.pushManager.getSubscription().then(function (subscription) {
            const channel = new BroadcastChannel('sw-messages');
            channel.postMessage(event.data.json().data);
        })
    );
});

messaging.setBackgroundMessageHandler(function (payload) {
    const channel = new BroadcastChannel('sw-messages');
    let data = payload.data;
    console.log(data);
    channel.postMessage(data);
    // var notificationTitle = data.title;
    // var notificationOptions = {
    //     body: data.author + ' ' + data.actionTitle,
    // };
    // return self.registration.showNotification(notificationTitle,
    //     notificationOptions);
});