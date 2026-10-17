// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
const CACHE = 'koko-8654913297';
const HASHES = {"account.html":"c9ee31cf9459","app.config.js":"1a1c88f8f33b","app.css":"7237975351c2","app.js":"4e0042838a1c","apple-touch-icon.png":"efb4569326ff","bar.html":"b5ed534258f4","farm.html":"98f2727cf64f","favicon-32.png":"103ed7ad91ef","fieldlog-api.js":"437152610375","fieldlog.html":"1c31c3c5c98c","fieldlog.module.json":"6e053fb30717","guide-app.js":"25b09323a183","guide-common.js":"e1430186a4ba","guide.html":"f1facd90ed81","home.html":"11fb6a431a66","icon-192.png":"42fad317520f","icon-512.png":"47ec65400397","icon-maskable-512.png":"11974c7cb55a","jobs-api.js":"eef36018d5b9","jobs.html":"698fa14b6a13","jobs.module.json":"7fb09ad0cc2a","kk-app.json":"b7af1127a247","kk-base.js":"db30acdffcc5","kk-crew.js":"7d24d8d91ed3","kk-doc.js":"cd710b6ef41e","kk-family.js":"1ad50c6d8347","kk-modules.js":"7e39b97e895e","kk-photos.js":"f597d5ec85fc","kk-reply.js":"cfffb103e75b","kk-social.js":"758e04cf8919","kk-units.js":"18edf57b0ee4","kk.css":"0ccc47037efc","koko-data.js":"1eaf44d90bff","koko.css":"002faad3b636","koko.js":"e5c75daf1a22","land-api.js":"98a5f9a7357b","land.html":"d43d41522e2f","land.module.json":"12c6621b8f18","learn.html":"4560bea568fe","ledger-api.js":"ec0c86162f07","ledger.html":"320c1377f8b0","ledger.module.json":"6f9c49d0d2d0","library.html":"97f35bbf877f","license.html":"f559a50b6255","map.html":"a8048bf4f60d","origin-db.js":"61c7a0788426","package.json":"8bcd5d0f569f","photos-api.js":"e7aab3e3dada","places.js":"a1e2ae67665b","privacy.html":"5172a7bbca02","pv.js":"6a17044259fd","qrcode.js":"648f1bfa751c","rows.html":"fd434ead0b83","schema.js":"6c5c08ad7c1c","sharecard.js":"f7def2bb9d20","sync.js":"e10957a027f9","tap.js":"9fa65790b33b","taste.html":"aabf526b29a2","team-api.js":"34f8317fea1f","team.html":"9429933a2482","team.module.json":"a5f03a6f9404","terms.html":"f272444fe59f","trace-api.js":"82f522a4f3bd","trace-core.js":"5b8be64eb070","trace.html":"ae7abd46e82d","trail.html":"918541557b64","weather-api.js":"947dc8ca2a95","weather-core.js":"dd2a7e0e2fa3","weather.html":"46edac1b46a3","weather.module.json":"ad7495775889","worker.js":"009b1dcab85d","LICENSE":"d8a6cc31abc1","manifest.webmanifest":"ea8ed3305d3a"};
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
  './kk-photos.js',
  './kk-doc.js',
  './kk-social.js',
  './kk-crew.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
];
// Cloudflare may answer page.html with a redirect to /page; a redirected answer cannot be handed to
// a page load, so copy it into a plain one.
async function clean(r) {
  if (!r || !r.redirected) return r;
  const b = await r.blob();
  return new Response(b, { status: r.status, statusText: r.statusText, headers: r.headers });
}
// Install: save every file of this build. A file whose contents match the copy already on this
// phone (same hash in the last build) is copied across, not downloaded again, so a deploy that
// changes two files costs the phone two downloads, not the whole app. Four at a time, so the page
// being used is not starved of network while this runs. A file that fails is fetched later on use.
async function installAll(H) {
  const c = await caches.open(CACHE);
  const prefix = CACHE.replace(/-[^-]+$/, '');
  let old = null,
    oldH = {};
  for (const k of await caches.keys()) {
    if (k === CACHE || !k.startsWith(prefix)) continue;
    const oc = await caches.open(k);
    const m = await oc.match('/__kk_hashes');
    if (m) {
      old = oc;
      oldH = await m.json().catch(() => ({}));
      break;
    }
  }
  const todo = CORE.slice();
  const one = async u => {
    const key = u.replace(/^\.\//, '');
    if (old && H[key] && oldH[key] === H[key]) {
      const hit = await old.match(u);
      if (hit) return c.put(u, hit);
    }
    const r = await fetch(new Request(u, { cache: 'reload' }))
      .then(clean)
      .catch(() => null);
    if (r && r.ok) await c.put(u, r);
  };
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (todo.length) await one(todo.shift()).catch(() => {});
    })
  );
  await c.put(
    '/__kk_hashes',
    new Response(JSON.stringify(H), { headers: { 'content-type': 'application/json' } })
  );
}
self.addEventListener('install', e => e.waitUntil(installAll(HASHES).then(() => self.skipWaiting())));
self.addEventListener('activate', e =>
  e.waitUntil(
    caches
      .keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
);
// Saved copy first. Within one build every file is fixed, so pages open from this phone at once,
// without waiting on a slow network. A new build changes this file (its cache name), so the phone
// installs the new copy in the background and the page offers to reload ("A new version is ready").
// API calls and other sites are never touched here.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  const nav = req.mode === 'navigate';
  e.respondWith(
    (async () => {
      const c = await caches.open(CACHE);
      const p = u.pathname;
      const keys = nav
        ? [p, p.endsWith('/') ? p + 'index.html' : p.endsWith('.html') ? p : p + '.html']
        : [req];
      for (const k of keys) {
        const hit = await c.match(k, { ignoreSearch: true });
        if (hit) return hit;
      }
      const r = await fetch(req)
        .then(clean)
        .catch(() => null);
      if (r && r.ok && r.type !== 'opaque') await c.put(nav ? u.origin + p : req, r.clone());
      if (r) return r;
      return (nav && ((await c.match('./home.html')) || (await c.match('./index.html')))) || Response.error();
    })()
  );
});
