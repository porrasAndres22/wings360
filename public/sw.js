


self.addEventListener('fetch', (e) => {

    const request = fetch(e.request).catch(() => caches.match('/jellyfish.html'))

    e.respondWith(request)

})