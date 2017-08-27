import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class PlanetSquare extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.PLANET_SQUARE)
  }

  setId(x, y) {
    this.idX = x;
    this.idY = y;
  }

  setFake(planet) {
    if (this.fake && this.fake !== planet) {
      this.fake.setSquare(null);
    }

    this.fake = planet;

    if (this.fake !== null) {
      this.fake.setSquare(this)
    }
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (this.fake) {
      this.fake.renderInLocation(this.x, this.y, context)
    }
  }
}