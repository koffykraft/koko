// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
// Cocoa knowledge and sums used by Koko pages. Facts are written in our own words; each group
// names its source. Guides, not guarantees: your farm, weather and local officer come first.
const KOKO_SRC = {
  CPCRI: [
    'ICAR-CPCRI, Fermentation methods for cocoa',
    'https://cpcri.gov.in/filemgr/webfs/download/FERMENTATION_METHODS.pdf',
  ],
  ICCO: ['ICCO, Harvesting and post-harvest', 'https://www.icco.org/harvesting-post-harvest-new/'],
  DV: [
    'De Vuyst and Weckx (2016), The cocoa bean fermentation process: from ecosystem analysis to starter culture development, Journal of Applied Microbiology 121: 5 to 17',
    'https://doi.org/10.1111/jam.13045',
  ],
  ICCOP: ['ICCO, Processing cocoa', 'https://www.icco.org/processing-cocoa/'],
  ISO: [
    'ISO 2451:2017 Cocoa beans (as TCVN 7519:2020)',
    'https://thuvienphapluat.vn/TCVN/Cong-nghe-Thuc-pham/TCVN-7519-2020-ISO-2451-2017-Hat-cacao-yeu-cau-chat-luong-va-dac-tinh-ky-thuat-919595.aspx',
  ],
  NEPC: ['NEPC Nigeria, Cocoa beans product profile (grades)', 'https://nepc.gov.ng/?p=217873'],
  KAU: ['Cocoa Research Centre, Kerala Agricultural University', 'https://crc.kau.in/crop-improvement'],
  KAUP: ['Cocoa Research Centre, KAU, crop protection', 'https://crc.kau.in/crop-protection'],
  FCIA: ['FCIA Fine Chocolate Glossary', 'https://chocolateglossary.com/?p=928'],
  CB: ['Callebaut, tempering methods', 'https://www.callebaut.com/en-GB/guide-different-tempering-methods'],
  LAL: ['Lallemand LALCOCOA yeasts (product brochures)', 'https://www.lalcocoayeast.com/en/'],
  REV: [
    'Daymond et al., A Global Review of Cocoa Farming Systems (ICCO, 2022)',
    'https://www.icco.org/wp-content/uploads/Global-Review-of-Cocoa-Farming-Systems_Final.pdf',
  ],
  GG: [
    'A Global Guide to Cocoa Farming Systems (ICCO and Swiss Foundation of the Cocoa and Chocolate Economy, 2022)',
    'https://www.icco.org/wp-content/uploads/B27407-Cocoa-Grower-Guide-English-CFW-v9-interactive.pdf',
  ],
};
const srcLink = k =>
  KOKO_SRC[k]
    ? '<a href="' + KOKO_SRC[k][1] + '" target="_blank" rel="noopener">' + KOKO_SRC[k][0] + '</a>'
    : '';

// ---------- planting material ----------
const KOKO_CLONES = [
  [
    'Criollo',
    'Group',
    'One of the old domesticated types that grow true from seed. Pale beans, mild and prized, but low yielding and disease prone.',
    'FCIA',
  ],
  [
    'Amelonado',
    'Group',
    'Old domesticated Forastero type, true from seed. The classic West African bulk cocoa.',
    'FCIA',
  ],
  [
    'Nacional',
    'Group',
    'Ecuadorian domesticated type, true from seed, known for floral flavour. Nacional hybrids are common.',
    'FCIA',
  ],
  [
    'Trinitario',
    'Group',
    'A traditional mixed population from crosses of Criollo and Forastero; ICS and UF clones come from it.',
    'FCIA',
  ],
  [
    'Upper Amazon (Forastero)',
    'Group',
    'Wild-origin Amazon material used in breeding for vigour and disease resistance.',
    'FCIA',
  ],
  ['CCN-51', 'Clone', 'Upper Amazon x Trinitario hybrid, grafted. High yielding.', 'FCIA'],
  ['ICS clones', 'Clone', 'Trinitario clones (Imperial College Selections), grafted.', 'FCIA'],
  ['UF clones', 'Clone', 'Trinitario clones, grafted.', 'FCIA'],
  [
    'CCRP 1 (M 16.9)',
    'KAU variety',
    'Selection released by the Cocoa Research Centre, KAU, Vellanikkara.',
    'KAU',
  ],
  ['CCRP 2 (M 13.12)', 'KAU variety', 'Selection released by CRC, KAU.', 'KAU'],
  ['CCRP 3 (G I 5.9)', 'KAU variety', 'Selection released by CRC, KAU.', 'KAU'],
  ['CCRP 4 (G II 19.5)', 'KAU variety', 'Selection released by CRC, KAU.', 'KAU'],
  ['CCRP 5 (G IV 18.5)', 'KAU variety', 'Selection released by CRC, KAU.', 'KAU'],
  ['CCRP 6 (G VI 55)', 'KAU variety', 'Selection released by CRC, KAU.', 'KAU'],
  ['CCRP 7 (G VI 56)', 'KAU variety', 'Selection released by CRC, KAU.', 'KAU'],
  [
    'CCRP 8 to CCRP 15',
    'KAU hybrid',
    'Hybrids released by CRC, KAU; higher pod yield than older varieties.',
    'KAU',
  ],
  [
    'VSD I 31.8',
    'KAU hybrid',
    'Hybrid released by CRC, KAU for resistance to vascular streak dieback.',
    'KAU',
  ],
];

// ---------- fermentation and drying guides ----------
const FERMENT_METHODS = {
  Box: {
    size: 'about 45 × 30 × 20 cm, drain holes',
    load: '15 to 20 kg wet beans',
    turn: 'every other day',
    note: 'Cover with banana leaves, a lid and a jute bag to hold the heat. The mass reaches 42 to 48 °C after about 48 hours.',
    src: 'CPCRI',
  },
  Basket: {
    size: 'about 25 cm across, 15 cm deep',
    load: '5 to 10 kg wet beans',
    turn: 'change the banana leaves at each turning',
    note: 'Banana leaves under and over the beans; stand it raised so sweatings drain.',
    src: 'CPCRI',
  },
  Tray: {
    size: 'about 45 × 30 × 15 cm, drain holes, stackable',
    load: '2 to 5 kg wet beans per tray',
    turn: 'restack or mix',
    note: 'Plastic trays or crates: less mould, light, washable.',
    src: 'CPCRI',
  },
  Heap: {
    size: 'a heap on banana leaves, covered with more leaves',
    load: 'any',
    turn: 'turn during the 5 to 7 days',
    note: 'The usual way in West Africa; turning evens out the fermentation.',
    src: 'REV',
  },
  'Box cascade': {
    size: 'a line of wooden boxes with slits in the base',
    load: 'large lots',
    turn: 'daily, moving the beans into the next box',
    note: 'Common in South America. In Trinidad, 6 to 8 days with turns at 48 and 96 hours.',
    src: 'REV',
  },
  Other: { size: '', load: '', turn: '', note: '', src: '' },
};
const FERMENT_GUIDE =
  'Open pods within 7 to 10 days of picking. The mass warms to 40 to 45 °C in the first 48 hours and the pulp drains from day 2. About 5 days for Forastero types, 2 to 3 for Criollo (ICCO); 6 days in boxes, baskets or trays (CPCRI).';
const DRY_GUIDE =
  'Dry slowly from about 60% to about 7.5% moisture, beans never above 65 °C. Too fast gives acid, bitter beans; too slow risks mould (ICCO). Export lots: 7.5% or less; at most 8% at the first sale in the producing country (ISO 2451).';
const DRY_NOTE =
  'Raised platforms give cleaner cocoa and are recommended; drying on bare soil is poor practice. Plastic drying houses help in wet weather. Wood or fuel dryers can leave smoke taint; Brazilian dryers run at 60 to 70 °C.';
const DRY_METHODS = [
  'Sun, raised beds',
  'Sun, cement yard',
  'Sun, mats or trays',
  'Solar dryer or polytunnel',
  'Mechanical dryer',
  'Sun then dryer',
  'Other',
];

// ---------- starter yeasts (Lallemand brochures) ----------
const STARTERS = {
  'LALCOCOA FORTE':
    'Saccharomyces cerevisiae. Warms the mass faster and helps a regular, complete fermentation: fewer purple beans, less bitterness, more cocoa aroma, dried fruit notes.',
  'LALCOCOA MATUNDA':
    'Saccharomyces cerevisiae. More fresh fruit, banana and honey notes, less astringency and bitterness, fewer purple beans.',
};
const STARTER_USE =
  'Dose 2 g dry yeast per kg of beans. Stir into 10 times its weight of clean water at 15 to 37 °C, wait 20 to 30 minutes, then pour it in gradually while filling the box. Turn as usual; at most 8 days. Keep packs below 25 °C and use an opened pack at once.';

// ---------- cut test and grade (ISO 2451; grade limits as listed by NEPC) ----------
const CUT_KEYS = [
  ['brown', 'Fully brown', 'well fermented'],
  ['partly', 'Partly brown, partly purple', 'part fermented'],
  ['purple', 'Purple', 'under-fermented'],
  ['slaty', 'Slaty (grey)', 'not fermented'],
  ['mouldy', 'Mouldy', 'defect'],
  ['insect', 'Insect damaged', 'defect'],
  ['germ', 'Germinated', 'defect'],
  ['flat', 'Flat', 'defect'],
];
function cutTest(c) {
  c = c || {};
  const v = k => Math.max(0, +c[k] || 0);
  const n = +c.n || CUT_KEYS.reduce((a, [k]) => a + v(k), 0);
  if (!n) return null;
  const pct = {};
  for (const [k] of CUT_KEYS) pct[k] = Math.round((v(k) / n) * 1000) / 10;
  const other = Math.round((pct.insect + pct.germ + pct.flat) * 10) / 10;
  const defective = Math.round((pct.mouldy + other) * 10) / 10;
  const grade =
    pct.mouldy <= 3 && pct.slaty <= 3 && other <= 3
      ? 'Grade I'
      : pct.mouldy <= 4 && pct.slaty <= 8 && other <= 6
        ? 'Grade II'
        : 'Below Grade II';
  const ferm =
    pct.slaty <= 5 && defective <= 5
      ? 'Good fermented'
      : pct.slaty <= 10 && defective <= 10
        ? 'Fair fermented'
        : 'Poorly fermented';
  return { n, pct, other, defective, grade, ferm, brown: pct.brown };
}
// Bean count: beans in 100 g, from a count or from the weight of 300 beans.
function beanCount(per100, w300) {
  const c = +per100 || (+w300 ? 30000 / +w300 : 0);
  if (!c) return null;
  const n = Math.round(c);
  const cls =
    n <= 100
      ? 'Standard (100 or fewer)'
      : n <= 110
        ? '101 to 110'
        : n <= 120
          ? 'Small (111 to 120)'
          : 'Very small (over 120)';
  return { count: n, cls };
}

// ---------- fermentation run summary ----------
function fermentSummary(r) {
  const h = (a, b) => (a && b ? Math.round((new Date(b) - new Date(a)) / 36e5) : null);
  const turns = (r.turns || []).filter(t => t && (t.at || t.temp));
  const temps = turns.map(t => +t.temp).filter(x => isFinite(x) && x > 0);
  const dry = (r.dryReads || []).filter(x => x && x.moisture !== '' && x.moisture != null);
  const lastM = dry.length ? +dry[dry.length - 1].moisture : null;
  const wet = +r.wetKg || null,
    out = +r.dryKg || null;
  return {
    fermentHours: h(r.start, r.fermentEnd),
    turns: turns.length,
    peak: temps.length ? Math.max(...temps) : null,
    dryDays: r.dryStart && r.dryEnd ? Math.round((new Date(r.dryEnd) - new Date(r.dryStart)) / 864e5) : null,
    moisture: lastM,
    recovery: wet && out ? Math.round((out / wet) * 1000) / 10 : null,
  };
}

// ---------- bean to bar ----------
// From nib weight and the recipe percentages, the weight of every part of the batch.
function recipe(nibsKg, p) {
  const nibs = +nibsKg || 0,
    pc = k => Math.max(0, +p[k] || 0);
  const total = pc('nibs') ? nibs / (pc('nibs') / 100) : 0;
  const sum = ['nibs', 'butter', 'sugar', 'milk', 'other'].reduce((a, k) => a + pc(k), 0);
  const kg = k => Math.round(((total * pc(k)) / 100) * 1000) / 1000;
  return {
    total: Math.round(total * 1000) / 1000,
    sum,
    butter: kg('butter'),
    sugar: kg('sugar'),
    milk: kg('milk'),
    other: kg('other'),
    cocoa: Math.round((pc('nibs') + pc('butter')) * 10) / 10,
  };
}
const TEMPER = {
  Dark: { melt: '40 to 50', cool: '27', work: '31 to 32', max: '34.5' },
  Milk: { melt: '45', cool: '27', work: '29 to 30', max: '32.5' },
  White: { melt: '45', cool: '27', work: '28 to 29', max: '31.5' },
};

// ---------- tasting ----------
const TASTE_ATTRS = [
  ['cocoa', 'Cocoa'],
  ['acid', 'Acidity'],
  ['bitter', 'Bitterness'],
  ['astr', 'Astringency'],
  ['sweet', 'Sweetness'],
  ['fresh', 'Fresh fruit'],
  ['brown', 'Browned fruit'],
  ['floral', 'Floral'],
  ['spice', 'Spice'],
  ['nutty', 'Nutty'],
  ['caramel', 'Caramel, panela'],
  ['woody', 'Woody'],
  ['earthy', 'Earthy, vegetal'],
];
const TASTE_OFF = ['Mouldy', 'Smoky', 'Hammy or over-fermented', 'Dirty or dusty', 'Musty', 'Too acidic'];

// ---------- crop care (Cocoa Research Centre, KAU) ----------
const CARE = [
  [
    'Phytophthora pod rot (black pod)',
    'Disease',
    'Small water-soaked spots on pods turn brown and spread until the pod is black. Worst in the rains.',
    'Remove and destroy infected pods often. Prune and thin overhead shade so air moves and humidity falls.',
    '',
  ],
  [
    'Charcoal pod rot (Botryodiplodia)',
    'Disease',
    'Pale yellow spots grow into large chocolate-brown patches; pods dry and stay hanging. More in the dry season.',
    'The fungus enters through wounds: avoid damaging pods.',
    'Rovral (iprodione) 2000 ppm monthly for six dry-season months, or 1% Bordeaux mixture with an insecticide.',
  ],
  [
    'Vascular streak dieback',
    'Disease',
    'The second or third leaf behind the tip yellows with green islands, leaves fall, the middle of the shoot goes bare.',
    'Plant tolerant material: Upper Amazon and Trinitario types suffer less than Amelonado and its hybrids. KAU released VSD I 31.8 for resistance.',
    '',
  ],
  [
    'Phytophthora canker',
    'Disease',
    'Grey-brown, wet-looking bark patches with dark edges and a reddish ooze that dries rusty. Can girdle and kill stems.',
    'Cut out affected bark and small branches early; controlling pod rot also cuts canker.',
    'Bordeaux paste or a copper fungicide on the wound.',
  ],
  [
    'White thread blight',
    'Disease',
    'White fungal threads on young branches spreading to leaves. Fast in humid weather.',
    'Regulate shade, remove affected parts, open the canopy.',
    'Copper fungicide in severe cases.',
  ],
  [
    'Pink disease',
    'Disease',
    'Fan branches and twigs die, white silky growth under the bark.',
    'Remove and destroy infected branches, reduce shade, keep drainage good.',
    'Seal cut ends with Bordeaux paste.',
  ],
  [
    'Cherelle wilt',
    'Disorder',
    'Young pods lose their shine, shrivel and dry in 4 to 7 days but stay on the tree.',
    'Often the tree carrying more than it can feed; also insects or disease. Feed and water well.',
    '',
  ],
  [
    'Tea mosquito bug (Helopeltis)',
    'Pest',
    'Round water-soaked spots around feeding holes on pods, turning black; many bites deform pods. Serious in Idukki and Kottayam.',
    'Weed before and after the monsoon; prune and regulate shade so light gets in.',
    'Thiamethoxam (Actara) 2 g in 10 L, or Oberon 1 ml per L.',
  ],
  [
    'Red borer (Zeuzera)',
    'Pest',
    'Larvae bore into shoots and the main stem of young plants.',
    'Check young plants; remove affected shoots.',
    'Neem oil 5 to 10 ml per L on the stem; chlorantraniliprole 18.5 SC 3 ml in 10 L, or flubendiamide 2 ml in 10 L.',
  ],
  [
    'Mealy bug',
    'Pest',
    'Colonies on shoots, buds, flower stalks and pods; sunken patches, cracks and pits on pods.',
    'Act early.',
    '2% neem oil suspension early; in severe cases thiamethoxam 2 g in 10 L or imidacloprid 0.5 ml per L after a soap spray, every two weeks.',
  ],
  [
    'Grey weevil',
    'Pest',
    'Adults eat the leaf underside down to the veins; worst on plants under two years, July to September.',
    'Watch young plants in the season.',
    'Lambda-cyhalothrin or cypermethrin 0.01%, twice a year (May, September), under the leaves.',
  ],
  [
    'Striped squirrel',
    'Animal',
    'Holes in ripe pods; pulp eaten.',
    'Harvest ripe pods at regular intervals; cover pods with punched polythene bags smeared with bitumen.',
    'Trapping with baits.',
  ],
  [
    'Rats',
    'Animal',
    'Holes in pods, inner wall scraped, mostly once pods start to bronze.',
    'Harvest as furrows start to bronze; traps baited with coconut.',
    'Rain-proof bromadiolone cake, 10 g, twice within 10 to 12 days.',
  ],
];

// ---------- around the world (ICCO global review and guide, 2022) ----------
const DENSITY = { Ghana: 1111, Indonesia: 1111, "Côte d'Ivoire": 1333 };
const WORLD = {
  ferment: [
    ['Ghana', 'Mostly heaps, some sweatboxes; dried about six days on raised platforms with bamboo mats.'],
    [
      "Côte d'Ivoire",
      'Heaps, then wooden crates; dried in thin layers on platforms, concrete or black plastic.',
    ],
    ['Nigeria', 'Trays, a version of the box method.'],
    [
      'Indonesia',
      'Few farmers ferment (small premium); boxes or sacks where they do; dried on tarpaulins, concrete, racks or in polythene houses.',
    ],
    ['Papua New Guinea', 'Long, heavy fermentation of up to 10 days.'],
    ['Philippines', 'Boxes for 5 to 7 days, then a solar drying house.'],
    [
      'Ecuador',
      'Uncertified cocoa often not fermented; certified cocoa goes to central post-harvest centres with monitored box fermentation.',
    ],
    ['Peru', 'Boxes; fermenting and drying can take up to 12 days for export lots.'],
    [
      'Brazil',
      'About 20% of farmers ferment (no price difference); boxes, with sun, dryer or mixed drying on barcaças.',
    ],
    ['Trinidad and Tobago', 'Boxes for 6 to 8 days, turned at 48 and 96 hours, then careful sun drying.'],
    ['Nicaragua', 'Farmers often sell wet beans to be processed by others.'],
  ],
  pests: [
    ['Everywhere', 'Phytophthora palmivora (black pod) and mirid bugs.'],
    ['Ghana', 'Cacao swollen shoot virus, Phytophthora megakarya, thread blight, pink disease, mistletoe.'],
    [
      "Côte d'Ivoire",
      'Swollen shoot virus (controlled by cutting out and replanting), P. megakarya, mistletoe, stem borer.',
    ],
    ['Indonesia', 'Cocoa pod borer, vascular streak dieback, Rosellinia root rot.'],
    ['Brazil', "Witches' broom (Moniliophthora perniciosa), Phytophthora, Ceratocystis wilt."],
    ['Ecuador', "Witches' broom, frosty pod (Moniliophthora roreri), Ceratocystis wilt."],
  ],
  facts: [
    'Pests and diseases take an estimated 30 to 40% of possible production.',
    'Low soil pH (below 5.0) and poor nutrition cut yields; soil organic matter is falling on many farms. Volcanic soils and some phosphate fertilisers can add cadmium.',
    'Shade trees protect against heat and dry air, cycle nutrients and can bring income, but heavy shade lowers yield and raises fungal disease.',
    "Recommended planting: 1111 trees per hectare in Ghana and Indonesia, 1333 in Côte d'Ivoire; real farms range from under 300 to over 3500.",
    'Almost all West African cocoa is grown from seed; Asia and the Americas use both seed and grafted clones.',
    'Pulp and husk can be income too: pulp juice, jam, cocoa honey, wine, and chocolate made by co-operatives.',
  ],
};
