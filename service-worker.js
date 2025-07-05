// service-worker.js

const CACHE_NAME = "MRMODS-App-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/main.html",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
  "https://avatars.githubusercontent.com/u/196933094?v=4",
  "https://server.wallpaperalchemy.com/storage/wallpapers/50/majestic-lighthouse-on-icy-cliff-4k-wallpaper.jpg",
  "https://cdn4.cdn-telegram.org/file/WPXRkyFdcvM5hfu21Wa5KwzYv1FtqXW8be8_WnhrdqNHTDE2qqbKQOYUmpljZgOgdBOeA77gcOz8u7Wg5N38NY01N3x3UUNyQ3DqOSEf71qLscTEL4XTwSwkmi93w__8w3RVDrkRPdj5jOKP5_2dbNgOLL0VDIH_ZEcNLh2SRegiCeyNuw7th83OUXd_bZ1AFos_fSXKKAmwl9w4Ugf-PfrDvoCPkGixpU7tO68o5oNNPotet8I6WZ234_kBQRYtxZOqL5iVwUFLK-DEun1jwJyZCFZwvL6U6pQbvLBhL_tymJ0hlPf94gBXkaFSgiD8TUEf6v1yUmImWi0FB1xxeA.jpg"
];

// أثناء التثبيت: حفظ الموارد في الـcache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// عند الطلب: توفير المحتوى من الـcache إذا لم يكن هناك اتصال بالإنترنت
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // إذا كانت الاستجابة موجودة في الـcache، يتم استخدامها مباشرة
      if (cachedResponse) {
        return cachedResponse;
      }

      // في حال عدم وجود استجابة، يتم طلب البيانات من الشبكة
      return fetch(event.request);
    })
  );
});

// عند التحديث: حذف النسخ القديمة من الـcache
self.addEventListener("activate", (event) => {
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
