// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
// Generated from kk-app.json by scripts/kk-modules.mjs. Edit kk-app.json, not this file.
import * as weather from './weather-api.js';
import * as fieldlog from './fieldlog-api.js';
import * as team from './team-api.js';
import * as jobs from './jobs-api.js';
import * as ledger from './ledger-api.js';
import * as land from './land-api.js';
export const MODULE_SETTINGS = {
  weather: {
    source: 'openmeteo',
    rainyDayMm: 2.5,
    firstYears: 2,
  },
  fieldlog: {
    nutrientKinds: [
      'Fertiliser',
      'Manure or compost',
      'Lime or dolomite',
      'Foliar spray',
      'Bio-input',
      'Other',
    ],
    products: [
      'Urea 46-0-0',
      'DAP 18-46-0',
      'MOP 0-0-60',
      'SSP 0-16-0',
      'Rock phosphate 0-18-0',
      'NPK 17-17-17',
      'NPK 10-26-26',
      'Factamfos 20-20-0',
      'Ammonium sulphate 21-0-0',
      'Farmyard manure',
      'Compost',
      'Vermicompost',
      'Neem cake',
      'Dolomite',
      'Agricultural lime',
    ],
    units: ['kg', 'g', 't', 'bag 50 kg', 'l', 'ml'],
    waterKinds: ['Irrigation', 'Fertigation', 'Other'],
    waterMethods: ['Sprinkler', 'Drip', 'Hose or basin', 'Flood', 'Other'],
    healthIssues: [
      'Black pod rot',
      'Charcoal pod rot',
      'Vascular streak dieback',
      'Stem canker',
      'Tea mosquito bug',
      'Mealybug',
      'Pod borer',
      'Squirrels and rats',
      'Nutrient deficiency',
      'Drought stress',
      'Waterlogging',
      'Weeds',
      'Other',
    ],
    severity: ['Low', 'Medium', 'High'],
    workKinds: ['Weeding', 'Pruning', 'Planting', 'Gap filling', 'Spraying', 'Mulching', 'Other'],
    treeWord: 'plants',
  },
  team: {
    currency: '₹',
    roles: ['Worker', 'Harvester', 'Supervisor', 'Processing', 'Driver', 'Watchman', 'Other'],
    weeklyOff: [0],
    halfDay: 0.5,
    leaveKinds: [
      {
        name: 'Paid leave',
        pay: 1,
      },
      {
        name: 'Sick leave',
        pay: 1,
      },
      {
        name: 'Unpaid leave',
        pay: 0,
      },
    ],
  },
  jobs: {
    kinds: [
      {
        name: 'Pod harvest',
        unit: 'pod',
        basis: 'unit',
      },
      {
        name: 'Pod breaking',
        unit: 'kg wet beans',
        basis: 'unit',
      },
      {
        name: 'Fermentation turning',
        unit: 'day',
        basis: 'day',
      },
      {
        name: 'Drying',
        unit: 'day',
        basis: 'day',
      },
      {
        name: 'Pruning',
        unit: 'tree',
        basis: 'unit',
      },
      {
        name: 'Weeding',
        unit: 'day',
        basis: 'day',
      },
      {
        name: 'Spraying',
        unit: 'tank',
        basis: 'unit',
      },
      {
        name: 'Manuring',
        unit: 'tree',
        basis: 'unit',
      },
      {
        name: 'Other',
        unit: '',
        basis: 'fixed',
      },
    ],
  },
  ledger: {
    currency: '₹',
    products: ['Pods', 'Wet beans', 'Dry beans', 'Nibs', 'Cocoa mass', 'Chocolate', 'Other'],
    units: ['kg', 'quintal', 't', 'piece', 'l'],
    modes: ['Cash', 'Bank transfer', 'UPI', 'Cheque'],
    paymentCategories: [
      'Wages',
      'Fertiliser and manure',
      'Plant protection',
      'Fermentation and drying',
      'Packing',
      'Fuel and power',
      'Transport',
      'Tools and repairs',
      'Rent and lease',
      'Taxes and licences',
      'Other',
    ],
    receiptKinds: ['Against a sale', 'Advance from buyer', 'Subsidy or grant', 'Other income'],
  },
  land: {
    currency: '₹',
    areaUnits: ['acre', 'ha', 'cent', 'are'],
    titleKinds: ['Owned', 'Joint', 'Leased in', 'Leased out', 'Family, not yet partitioned', 'Other'],
    dueKinds: [
      'Land tax',
      'Building tax',
      'Water charges',
      'Electricity',
      'Insurance premium',
      'Loan instalment',
      'Other',
    ],
    licenceKinds: [
      'FSSAI food licence or registration',
      'Pesticide or fertiliser licence',
      'Shop or factory licence',
      'Pollution consent',
      'Vehicle papers',
      'Other',
    ],
    soonDays: 60,
  },
};
export const MODULES = [weather, fieldlog, team, jobs, ledger, land];
