self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open('mrmods-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/style.css', // إذا كنت تستخدم ملف CSS خارجي
        '/app.js', // إذا كنت تستخدم ملف JS خارجي
        'https://avatars.githubusercontent.com/u/196933094?v=4', // أيقونة التطبيق
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
