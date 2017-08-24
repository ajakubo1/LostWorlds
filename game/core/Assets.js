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
  'PROBE': 'PROBE',
  'PROBE_SQUARE': 'PROBE_SQUARE',
  'ENERGY': 'ENERGY',
  'LASER_HORIZONTAL': 'LASER_HORIZONTAL',
  'LASER_VERTICAL': 'LASER_VERTICAL',
  'BACKGROUND': 'BACKGROUND'
};