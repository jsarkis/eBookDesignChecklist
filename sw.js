/* https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e */

var APP_PREFIX = 'blitzDesign_'
var VERSION = 'v0_53'
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
  '/eBookDesignChecklist/',
  '/eBookDesignChecklist/index.html',
  '/eBookDesignChecklist/assets/blitz-16.svg',
  '/eBookDesignChecklist/assets/blitzDesign-decorations.svg',
  '/eBookDesignChecklist/css/styles.css',
  '/eBookDesignChecklist/js/script.js'
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})