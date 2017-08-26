import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Planet extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.PLANET)
  }

  inRange(x, y) {
    if (x > this.x && x < this.x + this.width &&
      y > this.y && y < this.y + this.height) {
      return true;
    }
    return false;
  }

  render(context) {
    this.renderInLocation(this.x, this.y, context)
  }

  renderInLocation(x, y, context) {
    context.drawImage(this.image, x, y, this.width, this.height);

    if (this.state === 'active') {
      context.fillStyle = 'red';
      context.globalAlpha = 0.2;
      context.fillRect(x, y, this.width, this.height)
      context.globalAlpha = 1.0;
    }
  }

  setSquare(square) {
    if (this.square) {
      this.square.setFake(null);
    }

    if (this.square === square) {
      this.square = null;
    } else {
      this.square = square;
    }
  }

  setState(name) {
    this.state = name;
  }
}

export const TYPES = {
  'NORMAL': 'NORMAL',
};