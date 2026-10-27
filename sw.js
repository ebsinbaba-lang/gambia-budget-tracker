// Simple background service worker script to make the web app fully installable
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Added explicit activation layer to force the browser to recognize full PWA criteria
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Allows network requests to pass through normally while satisfying PWA requirements
  e.respondWith(fetch(e.request));
});
