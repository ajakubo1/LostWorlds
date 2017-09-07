import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Planet extends Renderable {

  constructor (x, y, width, height, type) {
    super(x, y, width, height);
    this.type = type;
    this.image = this.getImage();
  }

  getImage() {
    return Engine.getAsset(this.type);
  }

  render(context) {
    this.renderInLocation(this.x, this.y, context)
  }

  renderInLocation(x, y, context) {
    context.drawImage(this.image, x, y, this.width, this.height);

    if (this.state === 'active') {
      context.fillStyle = 'red';
      context.globalAlpha = 0.2;
      context.fillRect(x, y, this.width, this.height);
      context.globalAlpha = 1.0;
    }
  }

  setSquare(square) {
    if (this.square && square) {
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
  "RED": 'RED',
  "GREEN": 'GREEN',
  "BLUE": 'BLUE',
  "SINGULARITY": "SINGULARITY",
  "CAT": "CAT"
};