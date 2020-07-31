////// CACHE_NAME || urlsToCache
const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html']

const self = this

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache')

                return cache.addAll(urlsToCache)
            })
    )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                console.log('hi')
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                } else {
                    return null
                }
            })
        ))

    )
})

////// Original
// const CACHE_NAME = 'KasirQu_01'
// const CacheAssets = [

// ]

// const self = this

// ////// Install -> handle cache the assets
// self.addEventListener('install', (event) => {
//     try {
//         event.waitUntil(
//             caches.open(CACHE_NAME)
//                 .then((cache) => {
//                     console.log('cache open')
//                     return cache.addAll(CacheAssets)
//                 })
//             // .then(() => self.skipWaiting())
//         )
//     } catch (err) {
//         console.log('Log: err', err)
//     }
// })

// ////// Activate -> remove un wanted caches
// self.addEventListener('activate', (event) => {
//     try {
//         const cacheWhiteList = []
//         cacheWhiteList.push(CACHE_NAME)

//         event.waitUntil(
//             caches.keys()
//                 .then((cacheNames) => Promise.all(
//                     cacheNames.map((cacheName) => {
//                         if (!cacheWhiteList.includes(cacheName)) {
//                             return caches.delete(cacheName)
//                         }
//                     })
//                 ))
//         )
//     } catch (err) {
//         console.log('Log: err', err)
//     }
// })

// ////// Requerst
// self.addEventListener('fetch', (event) => {
//     try {
//         event.respondWith(
//             caches.match(event.requst)
//                 .then(() => {
//                     return fetch(event.requst)
//                         .catch(() => caches.match('offline.html'))
//                 })
//         )
//     } catch (err) {
//         console.log('Log: err', err)
//     }
// })

////// sw_cached_pages
// const cacheName = 'v1'

// const cacheAssets = [
//   'index.html',
//   'about.html',
//   '/css/style.css',
//   '/js/main.js'
// ]

// // Call Install Event
// self.addEventListener('install', e => {
//   console.log('Service Worker: Installed')

//   e.waitUntil(
//     caches
//       .open(cacheName)
//       .then(cache => {
//         console.log('Service Worker: Caching Files')
//         cache.addAll(cacheAssets)
//       })
//       .then(() => self.skipWaiting())
//   )
// })

// // Call Activate Event
// self.addEventListener('activate', e => {
//   console.log('Service Worker: Activated')
//   // Remove unwanted caches
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker: Clearing Old Cache')
//             return caches.delete(cache)
//           }
//         })
//       )
//     })
//   )
// })

// // Call Fetch Event
// self.addEventListener('fetch', e => {
//   console.log('Service Worker: Fetching')
//   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
// })




////// sw_cached_site
// const cacheName = 'v2'

// // Call Install Event
// self.addEventListener('install', e => {
//   console.log('Service Worker: Installed')
// })

// // Call Activate Event
// self.addEventListener('activate', e => {
//   console.log('Service Worker: Activated')
//   // Remove unwanted caches
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker: Clearing Old Cache')
//             return caches.delete(cache)
//           }
//         })
//       )
//     })
//   )
// })

// // Call Fetch Event
// self.addEventListener('fetch', e => {
//   console.log('Service Worker: Fetching')
//   e.respondWith(
//     fetch(e.request)
//       .then(res => {
//         // Make copy/clone of response
//         const resClone = res.clone()
//         // Open cahce
//         caches.open(cacheName).then(cache => {
//           // Add response to cache
//           cache.put(e.request, resClone)
//         })
//         return res
//       })
//       .catch(err => caches.match(e.request).then(res => res))
//   )
// })
