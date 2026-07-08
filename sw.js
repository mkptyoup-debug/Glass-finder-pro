const CACHE_VERSION = '28.0';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

// —— FIREBASE CLOUD MESSAGING (background notifications) ————————————————
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC_OXACPuxzAerOWiQ6O1BZBL0Du8Axdtg",
  authDomain: "glass-finder-pro.firebaseapp.com",
  projectId: "glass-finder-pro",
  storageBucket: "glass-finder-pro.firebasestorage.app",
  messagingSenderId: "1082015655381",
  appId: "1:1082015655381:web:cf24bbc2d7442b10a6c95c"
});

var messaging = firebase.messaging();

// Yeh function chalti hai jab app band ho ya background mein ho aur notification aaye
messaging.onBackgroundMessage(function(payload) {
  var title = (payload.notification && payload.notification.title) || 'Universal Combo';
  var options = {
    body: (payload.notification && payload.notification.body) || 'Naya update aaya hai!',
    icon: '/file_00000000c5147206b3fb449.png',
    badge: '/file_00000000c5147206b3fb449.png',
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(title, options);
});

// Notification pe tap karne par app khulna
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if (clientList[i].url.indexOf(self.registration.scope) === 0 && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
