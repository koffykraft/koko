// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
const CACHE = 'koko-v21';
const CORE = [
  './app.config.js',
  './app.js',
  './app.css',
  './places.js',
  './weather.html',
  './weather-core.js',
  './fieldlog.html',
  './team.html',
  './jobs.html',
  './ledger.html',
  './land.html',
  './home.html',
  './farm.html',
  './map.html',
  './bar.html',
  './taste.html',
  './learn.html',
  './trail.html',
  './rows.html',
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
  './kk-family.js',
  './kk-reply.js',
  './guide.html',
  './guide-common.js',
  './guide-app.js',
  './library.html',
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
// Newest first: ask the network, and use the saved copy when offline or when the network takes
// more than 3 seconds. A slow answer still lands in the cache, and the page is told a newer copy
// is ready so it can offer to reload. API calls and other sites are never touched here.
async function clean(r) {
  if (!r || !r.redirected) return r;
  const b = await r.blob();
  return new Response(b, { status: r.status, statusText: r.statusText, headers: r.headers });
}
const WAIT_MS = 3000;
async function store(key, r) {
  if (r && r.ok && r.type !== 'opaque') {
    const c = await clean(r.clone());
    await (await caches.open(CACHE)).put(key, c);
  }
  return r;
}
async function tell(id) {
  for (let i = 0; i < 20; i++) {
    const c = id && (await self.clients.get(id));
    if (c) return c.postMessage({ kk: 'updated' });
    await new Promise(z => setTimeout(z, 250));
  }
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  const nav = req.mode === 'navigate';
  const key = nav ? new Request(u.origin + u.pathname) : req;
  e.respondWith(
    (async () => {
      const net = fetch(nav ? u.origin + u.pathname : req, { cache: 'no-store' })
        .then(r => store(key, r))
        .catch(() => null);
      let late = false;
      const first = await Promise.race([
        net,
        new Promise(z =>
          setTimeout(() => {
            late = true;
            z(null);
          }, WAIT_MS)
        ),
      ]);
      if (first && first.ok) return clean(first);
      const hit =
        (await caches.match(key, { ignoreSearch: true })) ||
        (nav
          ? await caches.match(u.pathname.endsWith('.html') ? u.pathname : u.pathname + '.html', {
              ignoreSearch: true,
            })
          : null);
      if (hit) {
        // the network was slow: when it does answer, say a newer copy is ready
        if (late && nav)
          e.waitUntil(
            net.then(async r => {
              if (!r || !r.ok) return;
              const [a, b] = await Promise.all([
                r
                  .clone()
                  .text()
                  .catch(() => ''),
                hit
                  .clone()
                  .text()
                  .catch(() => ''),
              ]);
              if (a && a !== b) await tell(e.resultingClientId || e.clientId);
            })
          );
        else e.waitUntil(net);
        return clean(hit);
      }
      const r = first || (await net);
      return r ? clean(r) : nav ? (await caches.match('./home.html')) || Response.error() : Response.error();
    })()
  );
});
