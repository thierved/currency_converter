
self.addEventListener('install', (event) => {
    console.log('sw installed');
    event.waitUntil(
        caches.open('static')
            .then(cache => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/main.css',
                    '/app.js'
                ])
        })
    );
});

self.addEventListener('activate', () => {
    console.log('sw activated');    
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});