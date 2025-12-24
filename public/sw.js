


self.addEventListener('fetch', (e) => {

    const offlineResquest = new Response(`Hola Offline`)


    const request = fetch(e.request).catch(() => offlineResquest)


    e.respondWith(request)

})