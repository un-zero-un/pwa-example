this.addEventListener('install', function(event) {
    console.log('on SW install');

    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
            ]);
        })
    );
});
