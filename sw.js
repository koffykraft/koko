// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
const CACHE = 'koko-v6';
const CORE = [
  './home.html',
  './farm.html',
  './map.html',
  './bar.html',
  './taste.html',
  './learn.html',
  './trail.html',
  './trace.html',
  './account.html',
  './license.html',
  './privacy.html',
  './terms.html',
  './LICENSE',
  './koko.css',
  './kk.css',
  './koko.js',
  './koko-data.js',
  './kk-base.js',
  './kk-units.js',
  './tap.js',
  './pv.js',
  './sync.js',
  './origin-db.js',
  './trace-core.js',
  './qrcode.js',
  './sharecard.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
];
self.addEventListener('install', e =>
  e.waitUntil(
    caches
      .open(CACHE)
      .then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  )
);
self.addEventListener('activate', e =>
  e.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
);
// Fast and offline-first: answer from the cache at once, refresh the cache in the background.
// API calls and other sites are never touched here.
async function clean(r) {
  if (!r || !r.redirected) return r;
  const b = await r.blob();
  return new Response(b, { status: r.status, statusText: r.statusText, headers: r.headers });
}
function refresh(req, key) {
  return fetch(req, { cache: 'no-store' }).then(async r => {
    if (r && r.ok) {
      const c = await clean(r.clone());
      const cache = await caches.open(CACHE);
      await cache.put(key || req, c);
    }
    return r;
  });
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') {
    const key = new Request(u.origin + u.pathname);
    e.respondWith(
      (async () => {
        const hit =
          (await caches.match(key, { ignoreSearch: true })) ||
          (await caches.match(u.pathname.endsWith('.html') ? u.pathname : u.pathname + '.html', {
            ignoreSearch: true,
          }));
        const old = hit
          ? await hit
              .clone()
              .text()
              .catch(() => '')
          : '';
        const net = refresh(u.origin + u.pathname, key).catch(() => null);
        if (hit) {
          e.waitUntil(
            net.then(async r => {
              if (!r || !r.ok) return;
              const t = await r
                .clone()
                .text()
                .catch(() => old);
              if (t === old) return;
              const id = e.resultingClientId || e.clientId;
              for (let i = 0; i < 20; i++) {
                const c = id && (await self.clients.get(id));
                if (c) {
                  c.postMessage({ kk: 'updated' });
                  return;
                }
                await new Promise(z => setTimeout(z, 250));
              }
            })
          );
          return clean(hit);
        }
        const r = await net;
        return r ? clean(r) : (await caches.match('./home.html')) || Response.error();
      })()
    );
    return;
  }
  e.respondWith(
    (async () => {
      const hit = await caches.match(req, { ignoreSearch: true });
      const net = refresh(req).catch(() => null);
      if (hit) {
        e.waitUntil(net);
        return hit;
      }
      const r = await net;
      return r || Response.error();
    })()
  );
});
