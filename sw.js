const CACHE_NAME = 'rozgarbike-final-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Fetch handler kept minimal on purpose — we don't intercept/rewrite any
// requests. Chrome just needs a registered fetch handler to count the site
// as installable; not calling respondWith() lets every request go through
// normally over the network, so nothing can break page loads.
self.addEventListener('fetch', (e) => {
  // intentionally empty
});
