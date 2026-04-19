const CACHE_NAME = 'Alchemy-of-crossroads';

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/player.js',
    '/images/header.jpg',
    '/images/cover.jpg',
    '/images/icon.png',
    '/images/favicon.ico',
    '/audio/track1.mp3',
    '/audio/track2.mp3',
    '/audio/track3.mp3',
    '/audio/track4.mp3',
    '/audio/track5.mp3',
    '/audio/track6.mp3',
    '/audio/track7.mp3',
    '/audio/track8.mp3',
    '/audio/track9.mp3',
    '/audio/track10.mp3',
    '/audio/track11.mp3',
    '/audio/track12.mp3',
    '/audio/track13.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});