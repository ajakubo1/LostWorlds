export default class Assets {
  constructor() {
    this.assets = {};
  }

  get(id) {
    return this.assets[id];
  }

  set(id, asset) {
    this.assets[id] = asset;
  }
};

export const IDENTIFIERS = {
  "RED": 'RED',
  "GREEN": 'GREEN',
  "BLUE": 'BLUE',
  "SINGULARITY": 'SINGULARITY',
  "CAT": 'CAT',
  'PLANET_SQUARE': 'PLANET_SQUARE',
  'PLANET_SQUARE_ACTIVE': 'PLANET_SQUARE_ACTIVE',
  'LEVEL_SQUARE': 'LEVEL_SQUARE',
  'LEVEL_SQUARE_ACTIVE': 'LEVEL_SQUARE_ACTIVE',
  'LEVEL_SQUARE_DONE': 'LEVEL_SQUARE_DONE',
  'PROBE': 'PROBE',
  'PROBE_SQUARE': 'PROBE_SQUARE',
  'PROBE_SQUARE_ACTIVE': 'PROBE_SQUARE_ACTIVE',
  'ENERGY': 'ENERGY',
  'BACKGROUND': 'BACKGROUND',
  'PANEL': 'PANEL'
};