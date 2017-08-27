import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Energy extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.ENERGY)
  }

  setEnergy(points) {
    this.energy = points;
    this.max = points;
  }

  update () {
    if (this.energy > 0) {
      this.energy -= 1;
    }
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    context.fillStyle = 'green';
    context.fillRect(
      this.x,
      this.y + (1 - (this.energy / this.max)) * this.height,
      this.width,
      (this.energy / this.max) * this.height)
  }
}