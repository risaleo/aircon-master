const CACHE='aircon-master-v31a3-3103';
const FILES=[
 './',
 './index.html?v=3103',
 './styles.css?v=3103',
 './data.js?v=3103',
 './app.js?v=3103',
 './manifest.json',
 './hero-aircon.jpg',
 './icon-192.png',
 './icon-512.png',
 './apple-touch-icon.png',
 './premium-cooling-v31a3.svg?v=3103',
 './sarara-dehumidify-v31a3.svg?v=3103'
];

self.addEventListener('install',event=>{
 event.waitUntil(
  caches.open(CACHE)
   .then(cache=>cache.addAll(FILES))
   .then(()=>self.skipWaiting())
 );
});

self.addEventListener('activate',event=>{
 event.waitUntil(
  caches.keys()
   .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
   .then(()=>self.clients.claim())
 );
});

self.addEventListener('fetch',event=>{
 event.respondWith(
  fetch(event.request,{cache:'no-store'})
   .then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
    return response;
   })
   .catch(()=>caches.match(event.request))
 );
});
