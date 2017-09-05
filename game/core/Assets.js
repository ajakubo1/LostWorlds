export default class Assets {
  constructor() {
    this.assets = {};
    this.types = {};
  }

  get(id) {
    return this.assets[id];
  }

  getType(id) {
    return this.types[id];
  }

  set(id, asset, type) {
    this.assets[id] = asset;
    this.types[id] = type;
  }
};

export const TYPES = {
  'PLACEHOLDER': 'PLACEHOLDER'
};

export const IDENTIFIERS = {
  'PLANET': 'PLANET',
  'PLANET_SQUARE': 'PLANET_SQUARE',
  'PLANET_SQUARE_ACTIVE': 'PLANET_SQUARE_ACTIVE',
  'LEVEL_SQUARE': 'LEVEL_SQUARE',
  'LEVEL_SQUARE_ACTIVE': 'LEVEL_SQUARE_ACTIVE',
  'PROBE': 'PROBE',
  'PROBE_SQUARE': 'PROBE_SQUARE',
  'PROBE_SQUARE_ACTIVE': 'PROBE_SQUARE_ACTIVE',
  'ENERGY': 'ENERGY',
  'BACKGROUND': 'BACKGROUND',
  'PANEL': 'PANEL'
};