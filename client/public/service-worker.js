/* eslint-disable no-restricted-globals */
// service-worker.js

const CACHE_NAME = "student-portal-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/js/bundle.js", "/favicon.ico"];

// Install Service Worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update the Service Worker and delete old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Handle push notifications
self.addEventListener("push", (event) => {
  const title = "New Notification!";
  const options = {
    body: event.data ? event.data.text() : "No payload",
    icon: "/assets/biasLogo192.png",
    badge: "/assets/biasLogo192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});
