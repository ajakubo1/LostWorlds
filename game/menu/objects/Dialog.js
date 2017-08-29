import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import {fill} from "../../core/Letters";

export default class Dialog extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.PLANET_SQUARE)
  }

  setPixelSize(size) {
    this.size = size;
  }

  textToLoad(text) {
    this.text = text;
    this.textSoFar = "";
    this.currentLetter = 0;
    this.interval = 10;
    this.step = 0;
    this.stop = false;
  }

  setCallback(callback) {
    this.callback = callback;
  }

  update() {
    this.step += 1;
    if (!this.stop && this.step % this.interval === 0) {
      this.textSoFar = this.textSoFar + this.text[this.currentLetter];
      this.currentLetter += 1;

      if (this.currentLetter === this.text.length) {
        this.stop = true;
        this.callback();
      }
    }
  }

  loadText() {
    this.textSoFar = this.text;
    this.stop = true;
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    fill(this.x, this.y, this.width, this.height, this.textSoFar, context, 'red', this.size);
  }
}