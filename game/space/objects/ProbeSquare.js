import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class ProbeSquare extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.PROBE_SQUARE)
  }

  setState(name) {
    if (name === 'active') {
      this.image = Engine.getAsset(ASSET_IDENTIFIERS.PROBE_SQUARE_ACTIVE)
    } else if (name === 'inactive') {
      this.image = Engine.getAsset(ASSET_IDENTIFIERS.PROBE_SQUARE)
    }
  }
}