import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Scientist extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.PLANET_SQUARE)
  }
}