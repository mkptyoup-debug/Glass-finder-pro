// ── PUSH NOTIFICATIONS (Firebase) ───────────────────────────────────
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC_OXACPuxzAerOWiQ6O1BZBL0Du8Axdtg',
  authDomain: 'glass-finder-pro.firebaseapp.com',
  projectId: 'glass-finder-pro',
  messagingSenderId: '1082015655381',
  appId: '1:1082015655381:web:cf24bbc2d7442b10a6c95c',
});

// App band ho tab bhi notification dikhana aur click par app kholna Firebase khud sambhalta hai
firebase.messaging();
// ────────────────────────────────────────────────────────────────────

const CACHE_NAME = 'universal-combo-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache).catch(function(err) {
        console.log('Cache add error (non-fatal):', err);
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
