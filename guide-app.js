// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
// Koko's own sections of the user guide.
window.KK_LEARN = true;
window.KK_GUIDE_APP = [
  {
    id: 'farm',
    title: 'Farm: pods to dry beans',
    pages: ['farm'],
    open: 'farm.html',
    learn: 'learn.html',
    what: 'Every pod harvest, each fermentation and drying run, and the dry bean lots they make.',
    steps: [
      'Add your farm and blocks first (shade, variety or clone, year planted, area).',
      'Pod harvests: date, block, pods picked and black pod (rotten) pods.',
      'Fermentation and drying: which harvests went in, box or heap, turning days, temperatures, drying days and the dry weight.',
      'Dry bean lots: the beans from one or more runs, with the cut test and grade.',
    ],
    tips: ['Count rotten pods every round: the share tells you when black pod is getting ahead.'],
  },
  {
    id: 'bar',
    title: 'Bean to bar',
    pages: ['bar'],
    open: 'bar.html',
    learn: 'learn.html',
    what: 'One chocolate batch from dry beans: roast, crack and winnow, grind and refine, conche, temper and mould.',
    steps: [
      'New batch: pick the dry bean lot and the weight in.',
      'Roast: minutes and weight after; the roast loss works itself out.',
      'Winnow: nib weight; the shell share works itself out.',
      'Recipe: sugar, butter, milk; the weights for the planned mass are shown.',
      'Refining and conching hours, then chocolate out. Beans-to-bar yield is worked out.',
    ],
  },
  {
    id: 'taste',
    title: 'Taste',
    pages: ['taste'],
    open: 'taste.html',
    what: 'Score liquor, nibs or chocolate from 0 to 10 on the usual cocoa attributes, with off-flavours.',
    steps: [
      'New tasting: pick the lot or batch.',
      'Score each attribute, tick any off-flavours, add notes.',
      'Taste the same lot after each change in fermentation or roast to see what moved.',
    ],
  },
  {
    id: 'trace',
    title: 'Lot passports',
    pages: ['trace'],
    open: 'trace.html',
    what: 'A passport follows one lot from tree to bar, signed on the phone at each step and stamped daily into a public record, with a QR for the bag.',
    steps: [
      'Open a dry bean lot or batch › Passport. Check the steps it found and Seal.',
      'Print QR labels (3 per row on A4) for the bags.',
      'Sending to a buyer: Hand off with their email and the weight; they confirm receipt in their own app.',
      'Anyone can scan the QR to see the passport; no account is needed.',
    ],
  },
  {
    id: 'learn',
    title: 'Learn',
    pages: ['learn'],
    open: 'learn.html',
    what: 'Pod to bar, crop care, varieties, cocoa around the world, grades and protocols, each with its source.',
    steps: ['Pick a tab at the top; each part names where it comes from.'],
  },
];
