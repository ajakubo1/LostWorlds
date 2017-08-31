import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import {fill} from "../../core/Letters";
import Button from "../../core/Button";

export default class Dialog extends Renderable {

  constructor(x, y, width, height, texts) {
    super(x, y, width, height);
    this.continueClicked = this.continueClicked.bind(this);

    this.continue = new Button(x + width - 50, y + height - 20, 50, 20,
      '[...]', undefined, undefined, this.continueClicked);

    this.finished = texts.length - 1;

    this.currentText = 0;

    this.texts = texts;

    this.continueEnabled = false;

    this.textToLoad(this.texts[this.currentText]);
  }

  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.PLANET_SQUARE)
  }

  setPixelSize(size) {
    this.size = size;
    this.continue.setFontSize(size - 1);
    this.continue.width = 30 * (size - 1);
    this.continue.height = 15 * (size - 1);
    this.continue.x = this.x + this.width - this.continue.width;
    this.continue.y = this.y + this.height - this.continue.height;
  }

  textToLoad(text) {
    this.text = text;
    this.textSoFar = "";
    this.currentLetter = 0;
    this.interval = 10;
    this.step = 0;
    this.stop = false;
  }

  setFinishedCallback(callback) {
    this.finishedCallback = callback;
  }

  setStepCallback(callback) {
    this.stepCallback = callback;
  }

  showContinue() {
    this.stop = true;
    this.continueEnabled = true;
  }

  continueClicked() {
    this.continueEnabled = false;

    if (this.stepCallback) {
      this.stepCallback(this.currentText);
    }

    if(this.currentText === this.finished) {
      if (this.finishedCallback) {
        this.finishedCallback();
      }
    } else {
      this.currentText += 1;
      this.textToLoad(this.texts[this.currentText]);
    }
  }

  pressed(x, y) {
    if(this.continueEnabled && this.continue.inRange(x, y)) {
      this.continue.click();
    } else {
      this.loadText();
    }
  }

  moved(x, y) {
    if(this.continueEnabled && this.continue.state === 0 && this.continue.inRange(x, y)) {
      this.continue.setHover();
    } else if(this.continueEnabled && this.continue.state === 1 && !this.continue.inRange(x, y)) {
      this.continue.setNormal();
    }
  }

  update() {
    this.step += 1;
    if (!this.stop && this.step % this.interval === 0) {
      this.textSoFar = this.textSoFar + this.text[this.currentLetter];
      this.currentLetter += 1;

      if (this.currentLetter === this.text.length) {
        this.showContinue();
      }
    }
  }

  loadText() {
    this.textSoFar = this.text;
    this.showContinue();
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    fill(this.x, this.y, this.width, this.height, this.textSoFar, context, 'red', this.size);

    if(this.continueEnabled) {
      this.continue.render(context);
    }
  }
}