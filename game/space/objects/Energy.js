import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import {fillText} from "../../core/Letters";

export default class Energy extends Renderable {

  constructor (x, y, width, height, callback) {
    super(x, y, width, height);
    this.callback = callback;
  }

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

  renderLightning(context) {
    const x = this.x + this.width / 2 - 25;
    const y = this.y + this.height / 2 - 50;

    context.beginPath();
    context.fillStyle = "#f9f316";
    context.moveTo(x, this.y + this.height / 2 + 7);
    context.lineTo(x + 40, y);
    context.lineTo(x + 25, this.y + this.height / 2 - 7);
    context.lineTo(x + 50, this.y + this.height / 2 - 7);
    context.lineTo(x + 10, y + 100);
    context.lineTo(x + 25, this.y + this.height / 2 + 7);
    context.lineTo(x, this.y + this.height / 2 + 7);
    context.fill();
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    context.fillStyle = 'green';
    context.fillRect(
      this.x,
      this.y + (1 - (this.energy / this.max)) * this.height,
      this.width,
      (this.energy / this.max) * this.height);

    if (this.energy < this.max) {
      fillText(this.x,
        this.y + this.height - 50,
        this.width, 50,
        "Click to replace the battery", context, '#ffffff', 2)
    }

    this.renderLightning(context);
  }

  pressed(x, y) {
    if (this.inRange(x, y)) {
      this.callback();
    }
  }

  moved(x, y) {

  }
}