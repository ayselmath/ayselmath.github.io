const CACHE = 'aysel-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e) => {
    const r = e.request;
    if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
    e.respondWith(fetch(r).then((res) => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then((k) => k.put(r, c)); } return res; }).catch(() => caches.match(r).then((m) => m || caches.match('./') || caches.match('index.html'))));
});
