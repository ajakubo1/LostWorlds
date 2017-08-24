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