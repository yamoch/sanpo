const CACHE_NAME = 'sanpo-map-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時に最低限のファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ネットワークリクエストの処理（キャッシュがあれば返す、なければ通信）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});