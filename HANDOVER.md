# Koko handover

Read this first in any new chat. Koko is the cocoa edition of KoffyKraft, built on the same engines.

## Owner and rules
- Owner: T M Thomas (KoffyKraft, Kerala). Repo github.com/koffykraft/koko. Live at koko.koffykraft.coffee (custom domain set in the Cloudflare dashboard) and koko.tagroos.workers.dev.
- Same rules as KoffyKraft: no em dashes; plain short English; credit every source and write in our own words; check material from ChatGPT or non peer reviewed sources (slide decks, blogs) against standards, ICCO, research institutes or peer-reviewed papers before using it.
- Do not reveal TAGRO irrigation code. No supplier price lists. Do not get around blocked sites.

## Platform
- Cloudflare Worker `koko` (worker.js, copied from KoffyKraft) with static assets from the repo root. D1 database `koko` (0683798c-9144-431d-85f4-5495c2807257).
- The deploy token cannot run migrations. schema.js (made by `node scripts/build-schema.mjs` from migrations/) builds every table on the first API request to an empty database (schemaReady in worker.js).
- Record types (origin_records): estate = farm, plot = block, harvest = pod harvest, process = fermentation and drying run, green = dry bean lot, batch = bean-to-bar batch, tasting. Local store IndexedDB `KokoRecords` (origin-db.js); syncs when signed in.
- Offline: sw.js (CACHE koko-vN, bump on every release), registered from koko.js on every page.

## Pages
- map (from KoffyKraft map.html: block outlines on satellite, area, height, spots with Koko kinds, KML, GeoJSON, print; #plot/<id> and #green/<id>; plot clone shown as variety)
- bar: batchChain() in koko-data.js gives roast loss, shell loss, machine loss, share of dry beans that reached the bar as cocoa, beans per kg and per bar; Bean to bar list shows a batch-by-batch table with averages.
- Exports: Image or PDF on every farm record, batch and tasting (sharecard.js, lot cards carry the passport QR); Export CSV and Cards and PDF on each list (saveCsv in koko.js). Brix and pH: pulp Brix on pickings, Brix and pH at the start of a run and in each turn row; fermentSummary gives brixStart and brixLast.
- Owner view on account.html for ADMIN_EMAILS: accounts, page views (30 days), top pages, cloud records by type, account list, feedback, stamp passports now.
- home, farm (all farm records, cut test and grade, bean count, density, starter yeast dose, passport plan), bar (batch: roast, winnow shell %, recipe weights, refine, conche, temper guide), taste (0 to 10 attributes, off-flavours), learn (pod to bar, crop care, varieties, world, grades), trail (device only, KokoTrails), trace (lot passports, KokoTrace key store), account (sign-in, sync, save and restore all records, feedback), license, privacy, terms.
- Shared: koko.css, koko.js (header, footer, toast), koko-data.js (all cocoa facts and sums with sources in KOKO_SRC), kk.css, kk-base.js, kk-units.js, tap.js, sync.js, origin-db.js, trace-core.js, qrcode.js.

## Protocols and designations (11 Oct 2026)
- koko-data.js PROTOCOLS: 7 fermentation protocols with an evidence level (Standard, Practice, Trial, Experimental); picking one on a run fills method, before-fermenting and starter. Fields protocol and fruit on runs.
- DESIGNATIONS on dry lots (checks): ICCO Annex C fine or flavour origin (country listing, India not listed, Oct 2023), Heirloom (HCP), geographical indication (Chuao example), organic, Fairtrade, Rainforest Alliance, single estate, starter, fruit co-fermentation. eudrCheck() checks each block of a lot: GPS point, or outline over 4 ha (polyHa from the outline).
- Learn tabs: Protocols, Designations.

## Sources used
ICAR-CPCRI fermentation methods; ICCO harvesting and post-harvest, processing cocoa, Global Review and Global Guide to Cocoa Farming Systems (2022); ISO 2451:2017 via TCVN 7519:2020; NEPC grade table; Cocoa Research Centre KAU (varieties, crop protection); FCIA Fine Chocolate Glossary; Callebaut tempering; Lallemand LALCOCOA brochures; De Vuyst and Weckx (2016) J Appl Microbiol 121:5-17; Streule et al. (2024) Foods 13:1536; Eskes et al. (2012) ICRC; Pena Gonzalez et al. (2023) BJFT; ICCO Annex C revision (2023); HCP; WIPO Chuao; EFI EUDR factsheet (2026).
- Not used: a SlideShare deck on cocoa fermentation (not peer reviewed and the page could not be read).

## Tests and release
- `node tests/run.mjs` (static, lint, api with a fresh-database check, pages in a phone-size browser). `bash scripts/deploy.sh` runs the checks then `npx wrangler deploy` (needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment, never in files).

## Pending
- Custom domain koko.koffykraft.coffee: add it to the koko Worker in the Cloudflare dashboard (Workers, koko, Settings, Domains).
- Resend: the sign-in email needs RESEND_API_KEY set as a secret on the koko Worker (copy from roast).
- Ideas: share cards for lots, Malayalam explanations, trace-day passports with farm geo outline, more clone traits from KAU.
