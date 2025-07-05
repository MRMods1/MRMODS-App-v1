// service-worker.js

const CACHE_NAME = 'MRMODS-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.html',
  '/styles.css',
  '/script.js',
  '/favicon.ico',
  '/manifest.json',
  // أضف أي ملفات أخرى تحتاجها هنا
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إذا كان هناك نسخة مخزنة من الملف في الكاش، نعيده
        return response || fetch(event.request);
      })
  );
});
