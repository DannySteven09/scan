const CACHE_NAME = 'escaner-inventario-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com?plugins=forms,typography',
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
];

// Install: Cache core assets (offline shell)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
