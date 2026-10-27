// Simple background service worker script to make the web app fully installable
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Allows network requests to pass through normally while satisfying PWA requirements
  e.respondWith(fetch(e.request));
});
