
var cacheName = 'app-v1.5';
var filesToCache = [
    '/',
    'index.html',
    'css/style.css',
    'js/app.js',
    'js/game.js',
    'music/buttonpress.mp3',
    'manifest.json',
    'images/logo144.png',
    'images/logo128.png',
    'images/logo192.png',
    'images/logo256.png',
    'images/logo512.png',
    'images/assets/share-alt.svg'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  console.log('sw install event!');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
