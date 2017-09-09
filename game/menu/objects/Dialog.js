import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import {fillText} from "../../core/Letters";
import Button from "../../core/Button";

export default class Dialog extends Renderable {

  constructor(x, y, width, height, texts, scientist) {
    super(x, y, width, height);
    this.continueClicked = this.continueClicked.bind(this);

    this.continue = new Button(x + width - 50, y + height - 20, 50, 20,
      '[...]', this.continueClicked, '#333333', '#545454', '#AA1111');

    if (texts === null) {
      this.noGuideText = true;
      this.finished = 0;
    } else {
      this.noGuideText = false;
      this.finished = texts.length - 1;
    }

    this.currentText = 0;

    this.texts = texts;
    this.scientist = scientist;

    this.continueEnabled = false;
    if (!this.noGuideText) {
      this.textToLoad(this.texts[this.currentText]);
    } else {
      this.textToLoad(null);
    }
  }

  setPixelSize(size) {
    this.size = size;
    this.continue.setFontSize(size - 1);

    const origWidth = 30 * (size - 1);
    const origHeight = 15 * (size - 1);

    let buttonWidth = origWidth;
    let buttonHeight = origHeight;

    if (Engine.isMobile()) {
      buttonWidth = 1.5 * origWidth;
      buttonHeight = 1.5 * origHeight;
    }

    if(buttonWidth > 100) {
      buttonWidth = 100
    }

    if (buttonHeight > 60) {
      buttonHeight = 60;
    }

    this.continue.width = buttonWidth;
    this.continue.height = buttonHeight;

    this.continue.x = this.x + this.width - origWidth / 2;
    this.continue.y = this.y + this.height - origHeight / 2;
  }

  textToLoad(text) {
    if (text !== null) {
      this.scientist.setTalking(true);
    } else {
      this.scientist.setTalking(false);
    }

    this.text = text;
    this.textSoFar = "";
    this.currentLetter = 0;
    this.interval = 6;
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
    this.scientist.setTalking(false);
    this.stop = true;
    if(this.currentText === this.finished && this.finishedCallback) {
      this.continueEnabled = true;
    } else if (this.currentText !== this.finished) {
      this.continueEnabled = true;
    }
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
    if(this.continueEnabled && this.continue.pressed(x, y)) {
      return true;
    } else if (this.inRange(x, y)){
      this.loadText();
      return true;
    }
    return false;
  }

  moved(x, y) {
    if(this.continueEnabled) {
      this.continue.moved(x, y);
    }
  }

  update() {
    if (this.text) {
      this.step += 1;
      if (!this.stop && this.step % this.interval === 0) {
        this.textSoFar = this.textSoFar + this.text[this.currentLetter];
        this.currentLetter += 1;

        if (this.currentLetter === this.text.length) {
          this.showContinue();
        }
      }
    }
  }

  loadText() {
    this.textSoFar = this.text;
    this.showContinue();
  }

  render(context) {
    if (this.text) {
      context.fillStyle = "#DDDDDD";
      context.fillRect(this.x, this.y, this.width, this.height);

      fillText(this.x, this.y, this.width, this.height, this.textSoFar, context, '#121212', this.size);

      if(this.continueEnabled) {
        this.continue.render(context);
      }
    }
  }
}