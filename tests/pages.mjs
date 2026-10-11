// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
// Page checks in a phone-sized browser: every main page opens without script errors and
// without spilling sideways, and the key journeys work end to end against a stand-in API.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';

async function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_MODULE, 'playwright', path.join(process.env.HOME || '', '.npm-global/lib/node_modules/playwright/index.mjs')].filter(Boolean);
  for (const m of tries) { try { return (await import(m)).default || (await import(m)) } catch (e) {} }
  try { return createRequire(import.meta.url)('playwright') } catch (e) {}
  return null;
}

function serve(root) {
  const types = { html: 'text/html', js: 'text/javascript', css: 'text/css', png: 'image/png', svg: 'image/svg+xml', json: 'application/json', webmanifest: 'application/manifest+json' };
  const srv = http.createServer((q, s) => {
    let p = decodeURIComponent(new URL(q.url, 'http://x').pathname).replace(/^\/+/, '') || 'home.html';
    const f = path.join(root, p);
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.writeHead(404); s.end(); return }
    s.writeHead(200, { 'content-type': types[p.split('.').pop()] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

export async function run(root, t) {
  const pw = await loadPlaywright();
  if (!pw) { t.skip('browser checks', 'Playwright is not installed (npm i -D playwright)'); return }
  const srv = await serve(root); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const exe = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const ctx = await browser.newContext({ ...pw.devices['iPhone 13'], serviceWorkers: 'block' });
  await ctx.route(/cdnjs|tile|arcgis|openstreetmap|googleapis/, r => r.abort());
  try {
    // 1. every page opens cleanly
    const pages = ['home', 'farm', 'map', 'bar', 'taste', 'learn', 'trail', 'trace', 'account', 'license', 'privacy', 'terms'];
    const p = await ctx.newPage();
    await p.route('**/api/**', r => r.fulfill({ status: 401, contentType: 'application/json', body: '{"error":"authentication required"}' }));
    for (const f of pages) {
      await t.acheck(`${f} opens without errors`, async () => {
        const errs = []; const on = e => errs.push(e.message); p.on('pageerror', on);
        await p.goto(base + f + '.html'); await p.waitForTimeout(350); p.off('pageerror', on);
        const real = errs.filter(e => !/Leaflet|\bL is not defined/.test(e));
        if (real.length) throw new Error(real[0]);
        if ((await p.evaluate(() => document.body.innerText.trim().length)) < 50) throw new Error('page looks empty');
        const wide = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (wide > 2) throw new Error(`spills sideways by ${wide}px`);
        if (!(await p.$('.kkh-nav a[href="farm.html"]'))) throw new Error('no Koko menu');
      });
    }
    await p.close();

    // 2. journeys
    const q = await ctx.newPage(); const errs = []; q.on('pageerror', e => errs.push(e.message));
    await q.route('**/api/**', r => r.fulfill({ status: 401, contentType: 'application/json', body: '{"error":"authentication required"}' }));
    const fill = async (k, v) => q.fill('#form [data-k="' + k + '"]', String(v));
    const save = async () => { await q.click('#save'); await q.waitForTimeout(400) };
    await t.acheck('Farm: farm, block with planting density', async () => {
      await q.goto(base + 'farm.html#new/estate'); await q.waitForTimeout(400);
      await fill('name', 'Thumpassery Estate'); await save();
      await q.goto(base + 'farm.html#new/plot'); await q.waitForTimeout(400);
      await q.selectOption('#form [data-k="estateId"]', { index: 1 });
      await fill('name', 'Block 1'); await fill('clone', 'CCRP 1 (M 16.9)'); await fill('trees', 450); await fill('area', 1);
      const d = await q.$eval('#densOut', e => e.innerText); if (!d.includes('1112 trees per hectare')) throw new Error(d);
      await save();
    });
    await t.acheck('Farm: picking and fermentation run with starter yeast guide', async () => {
      await q.goto(base + 'farm.html#new/harvest'); await q.waitForTimeout(400);
      await q.check('#form [data-links="plotIds"] input'); await fill('pods', 900); await fill('wetKg', 90); await save();
      await q.goto(base + 'farm.html#new/process'); await q.waitForTimeout(400);
      await fill('code', 'F-1'); await q.check('#form [data-links="harvestIds"] input');
      await q.selectOption('#form [data-k="protocol"]', 'Pod storage, then box');
      if ((await q.inputValue('#form [data-k="method"]')) !== 'Box' || (await q.inputValue('#form [data-k="precond"]')) !== 'Pods stored before opening') throw new Error('protocol did not fill the method');
      const pg = await q.$eval('#protoGuide', e => e.innerText); if (!pg.includes('Trial') || !pg.includes('Streule')) throw new Error('protocol guide: ' + pg);
      await q.selectOption('#form [data-k="method"]', 'Box'); await q.selectOption('#form [data-k="starter"]', 'LALCOCOA FORTE');
      await fill('wetKg', 90); await fill('start', '2026-10-01T08:00'); await fill('fermentEnd', '2026-10-07T08:00');
      await q.fill('[data-list="turns"] .lrow [data-c="temp"]', '46');
      await q.fill('[data-list="dryReads"] .lrow [data-c="moisture"]', '7.2');
      await fill('dryKg', 33); await fill('brix', 18);
      await q.fill('[data-list="turns"] .lrow [data-c="brix"]', '12');
      const g = await q.$eval('#starterGuide', e => e.innerText); if (!g.includes('180 g yeast')) throw new Error('starter dose: ' + g);
      const m = await q.$eval('#methodGuide', e => e.innerText); if (!m.includes('42 to 48')) throw new Error('box guide');
      const s = await q.$eval('#runOut', e => e.innerText); if (!s.includes('144 h') || !s.includes('peak 46') || !s.includes('dry enough') || !s.includes('36.7%') || !s.includes('pulp 18 °Bx falling to 12 °Bx')) throw new Error(s);
      await save();
    });
    await t.acheck('Farm: dry lot cut test grades the lot and bean count classes it', async () => {
      await q.goto(base + 'farm.html#new/green'); await q.waitForTimeout(400);
      await fill('code', 'KC-1'); await q.selectOption('#form [data-k="processId"]', { index: 1 }); await fill('weightKg', 33);
      const cut = { brown: 250, partly: 30, purple: 10, slaty: 5, mouldy: 3, insect: 2, germ: 0, flat: 0 };
      for (const [k, v] of Object.entries(cut)) await q.fill('[data-cut="' + k + '"]', String(v));
      await fill('w300', 330);
      await q.check('[data-checks="designations"] input[value="Single estate"]');
      const dg = await q.$eval('#desigOut', e => e.innerText); if (!dg.includes('Block 1') || !dg.includes('GPS point, missing') || !dg.includes('31 December 2026')) throw new Error('EUDR: ' + dg);
      const c = await q.$eval('#cutOut', e => e.innerText); if (!c.includes('Grade I') || !c.includes('Good fermented')) throw new Error(c);
      const b = await q.$eval('#beanOut', e => e.innerText); if (!b.includes('91 beans per 100 g') || !b.includes('Standard')) throw new Error(b);
      await q.fill('[data-cut="slaty"]', '20');
      const c2 = await q.$eval('#cutOut', e => e.innerText); if (!c2.includes('Grade II')) throw new Error('slaty 6%: ' + c2);
      await q.fill('[data-cut="slaty"]', '5');
      await save();
      const lin = await q.$eval('#form', e => e.innerText); if (!lin.includes('Block 1') || !lin.includes('Thumpassery Estate')) throw new Error('lineage missing');
      await q.click('#card'); await q.waitForSelector('#kkcard .pv img', { timeout: 5000 });
      await q.evaluate(() => document.getElementById('kkcard').remove());
      await q.goto(base + 'farm.html#lots'); await q.waitForTimeout(400);
      const [dl] = await Promise.all([q.waitForEvent('download'), q.click('#csv')]);
      const csv = fs.readFileSync(await dl.path(), 'utf8'); if (!csv.includes('Grade') || !csv.includes('KC-1') || !csv.includes('Grade I')) throw new Error('lot CSV: ' + csv.slice(0, 200));
      await q.goto(base + 'farm.html#runs'); await q.waitForTimeout(400);
      const [dl2] = await Promise.all([q.waitForEvent('download'), q.click('#csv')]);
      if (!fs.readFileSync(await dl2.path(), 'utf8').includes('Pulp Brix at start')) throw new Error('run CSV without Brix');
    });
    await t.acheck('Farm: passport plan carries the whole chain with weights', async () => {
      const lotId = await q.evaluate(async () => (await ORIGIN.all('green'))[0].id);
      await q.goto(base + 'farm.html#edit/green/' + encodeURIComponent(lotId)); await q.waitForTimeout(500);
      await q.click('#pass'); await q.waitForTimeout(500);
      const plan = await q.evaluate(() => JSON.parse(sessionStorage.getItem('kk_trace_plan') || 'null'));
      if (!plan) throw new Error('no plan');
      const types = plan.items.map(i => i.rtype).join(',');
      if (types !== 'estate,plot,harvest,process,green') throw new Error(types);
      if (plan.items[2].kg.cherry !== 90 || plan.items[4].kg.green !== 33) throw new Error('weights');
      if (!/trace\.html#seal$/.test(q.url())) throw new Error('not on the seal page');
    });
    await t.acheck('Map: blocks and the lot show, with Koko place kinds', async () => {
      const stub = 'const mk=()=>{const f=function(){return p};const p=new Proxy(f,{get:(t,k)=>k==="then"?undefined:p,apply:()=>p});return p};window.L=mk();';
      await q.route(/leaflet.*\.js/, r => r.fulfill({ contentType: 'text/javascript', body: stub }));
      const lot = await q.evaluate(async () => (await ORIGIN.all('green'))[0].id);
      await q.goto(base + 'map.html#green/' + lot); await q.waitForTimeout(700);
      const txt = await q.innerText('body');
      if (!txt.includes('Block 1') || !txt.includes('CCRP 1') || !txt.includes('KC-1')) throw new Error(txt.slice(0, 300));
      const kinds = await q.evaluate(() => KINDS.join(','));
      if (!kinds.includes('Fermentary') || kinds.includes('Pulping')) throw new Error(kinds);
      await q.unroute(/leaflet.*\.js/);
    });
    await t.acheck('Bean to bar: shell share, recipe weights and temper warning', async () => {
      await q.goto(base + 'bar.html#new'); await q.waitForTimeout(400);
      await fill('name', '70% Thumpassery'); await q.selectOption('#form [data-k="lotId"]', { index: 1 });
      await fill('beansKg', 5); await fill('winIn', 4.6); await fill('nibsKg', 3.9);
      await q.fill('[data-p="nibs"]', '65'); await q.fill('[data-p="butter"]', '5'); await q.fill('[data-p="sugar"]', '30');
      const sh = await q.$eval('#shellOut', e => e.innerText); if (!sh.includes('15.2%')) throw new Error(sh);
      const r = await q.$eval('#recOut', e => e.innerText); if (!r.includes('70% cocoa') || !r.includes('6 kg') || !r.includes('1.8 kg sugar')) throw new Error(r);
      await fill('outKg', 5.7); await fill('bars', 50);
      const ch = await q.$eval('#chainOut', e => e.innerText);
      for (const w of ['−8%', '−15.2%', '−5%', '74.1% of the dry beans', '25.9%', '100 g of dry beans per bar']) if (!ch.includes(w)) throw new Error('chain missing ' + w + ': ' + ch);
      await q.selectOption('#form [data-k="chocType"]', 'Dark'); await fill('tWork', 35);
      if (!(await q.$eval('#temperOut', e => e.innerText)).includes('loses the temper')) throw new Error('no temper warning');
      await save();
      await q.goto(base + 'bar.html'); await q.waitForTimeout(300);
      if (!(await q.innerText('#view')).includes('70% Thumpassery')) throw new Error('batch not listed');
      const [dl3] = await Promise.all([q.waitForEvent('download'), q.click('#csv')]);
      if (!fs.readFileSync(await dl3.path(), 'utf8').includes('74.1')) throw new Error('batch CSV');
      const cmp = await q.innerText('#view'); if (!/weight loss, batch by batch/i.test(cmp) || !cmp.includes('74.1%')) throw new Error('no batch comparison: ' + cmp.slice(-600));
    });
    await t.acheck('Taste: a tasting of the batch is saved with its profile', async () => {
      await q.goto(base + 'taste.html#new'); await q.waitForTimeout(400);
      await q.selectOption('[data-k="batchId"]', { index: 1 });
      await q.evaluate(() => { const i = document.querySelector('[data-a="cocoa"]'); i.value = 7; i.dispatchEvent(new Event('input')) });
      await q.check('[data-off][value="Smoky"]'); await q.fill('[data-k="overall"]', '7.5');
      await q.click('#save'); await q.waitForTimeout(500);
      const v = await q.innerText('#view'); if (!v.includes('70% Thumpassery') || !v.includes('7.5/10') || !v.includes('Smoky') || !v.includes('Cocoa 7')) throw new Error(v.slice(0, 300));
    });
    await t.acheck('Learn: every tab shows sourced content', async () => {
      for (const [tab, want] of [['journey', 'De Vuyst'], ['care', 'tea mosquito'], ['clones', 'CCRP 1'], ['world', 'Papua New Guinea'], ['standards', 'Grade II'], ['protocols', 'Experimental'], ['designations', 'Annex C']]) {
        await q.goto(base + 'learn.html#' + tab); await q.waitForTimeout(250);
        const txt = (await q.innerText('#view')).toLowerCase(); if (!txt.includes(want.toLowerCase())) throw new Error(tab + ': ' + want);
      }
    });
    await t.acheck('Account: all records save to one file', async () => {
      await q.goto(base + 'account.html'); await q.waitForTimeout(300);
      const [dl] = await Promise.all([q.waitForEvent('download'), q.click('#exp')]);
      const j = JSON.parse(fs.readFileSync(await dl.path(), 'utf8'));
      for (const k of ['estate', 'plot', 'harvest', 'process', 'green', 'batch', 'tasting']) if (!j.records[k] || !j.records[k].length) throw new Error('no ' + k);
    });
    await t.acheck('Trail: a walk is recorded on the device', async () => {
      const stub = 'const mk=()=>{const f=function(){return p};const p=new Proxy(f,{get:(t,k)=>k==="then"?undefined:p,apply:()=>p});return p};window.L=mk();';
      await q.route(/leaflet.*\.js/, r => r.fulfill({ contentType: 'text/javascript', body: stub }));
      await ctx.grantPermissions(['geolocation']); await ctx.setGeolocation({ latitude: 9.0, longitude: 76.9, accuracy: 5 });
      await q.goto(base + 'trail.html#rec'); await q.waitForTimeout(500); await q.click('#go'); await q.waitForTimeout(300);
      for (let i = 1; i <= 3; i++) { await ctx.setGeolocation({ latitude: 9.0 + i * 0.0002, longitude: 76.9, accuracy: 5 }); await q.waitForTimeout(300) }
      await q.click('#fin'); await q.waitForTimeout(400); await q.click('#eOk'); await q.waitForTimeout(400);
      const n = await q.evaluate(async () => (await T.all()).filter(x => !x.draft && x.points.length >= 3).length);
      if (n !== 1) throw new Error('trails ' + n);
      if (await q.evaluate(() => 'SYNC' in window)) throw new Error('trail page loads cloud sync');
    });
    await t.acheck('no script errors during the journeys', async () => { if (errs.length) throw new Error(errs[0]) });
  } finally {
    await browser.close(); srv.close();
  }
}
