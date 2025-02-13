// console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs-v2";
const dynamicCacheName = "dynamic-cache-v1";
const assets = [
    '/',
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'pages/default.html'
];

// Cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

// Install SW
self.addEventListener('install', evt => {
    // console.log('service worker has been installed.');
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets);
        })
    );  
});

// Activate SW
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated.');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys)
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key)) // Added correct delete key logic
            )
        })
    )
});

// Fetch event
self.addEventListener('fetch', evt => {
    console.log(evt);

    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 5);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1){
                return caches.match('pages/default.html')
            }
        })
    );
});

// Push event
self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // Logic for handling notification click (e.g., navigate to a page)
  event.waitUntil(
    clients.openWindow('https://yourwebsite.com') // Example link
  );
});
