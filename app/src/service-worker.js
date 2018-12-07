const DEBUG = false;

const {assets} = global.serviceWorkerOption;
const CACHE_NAME = '1';

self.addEventListener('install', event => {
    if (DEBUG) {
        console.log('[SW] Install event');
    }

    const assetsToCache = ['.', ...assets];

    event.waitUntil(
        global.caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(assetsToCache))
            .then(() => {
                if (DEBUG) {
                    console.log('Cached assets: main', assetsToCache);
                }
            })
            .catch(error => {
                console.error(error);

                throw error;
            }),
    );
});

// After the install event.
self.addEventListener('activate', event => {
    if (DEBUG) {
        console.log('[SW] Activate event');
    }

    // Clean the caches
    event.waitUntil(
        global.caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete the caches that are not the current one.
                    if (cacheName.indexOf(CACHE_NAME) === 0) {
                        return null;
                    }

                    return global.caches.delete(cacheName);
                }),
            );
        }),
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetchAndCache(event.request);
            }),
    );
});

function fetchAndCache(url) {
    return fetch(url)
        .then(function (response) {
            // Check if we received a valid response
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME)
                .then(function (cache) {
                    cache.put(url, response.clone());
                    return response;
                });
        })
        .catch(function (error) {
            console.log('Request failed:', error);
            // You could return a custom offline 404 page here
        });
}

