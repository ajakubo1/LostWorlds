import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import LevelSquare from "./objects/LevelSquare";
import Scientist from "../menu/objects/Scientist";
import Dialog from "../menu/objects/Dialog";
import Indicator from "./objects/Indicator";

const tutorialDialog = [
  "Welcome to my lab!",
  "This is a blackbox",
  "What is a blackbox you ask?",
  "It's essentially a universe",
  "Err... In a box.",
  "Which is purple.",
  "It helps in science alright?!",
  "Or rather - it would've helped",
  "If it were labeled properly",
  "But that's where you come in!",
  "Go ahead!",
  "Take a look at the box I've prepared!"
];

export default class LevelScene extends Scene {
  constructor(dialog = 99) {
    super();

    this.nextStep = this.nextStep.bind(this);

    this.background = new Background(0, 0, Engine.width, Engine.height);
    this.levels = [];
    let i;
    const levels = Engine.globals.levels;
    for (i = 0 ; i < levels.length ; i += 1) {
      const level = levels[i];
      if (level.open) {
        const square = new LevelSquare(100 + i * 125, 100, 100, 100);
        square.setInfo(level);
        this.levels.push(square);
      } else {
        break;
      }
    }

    this.dialogOption = dialog;

    this.scientist = new Scientist(Engine.width / 2 - 50, Engine.height - 95, 50, 75);
    this.dialog = new Dialog(Engine.width / 2 + 25, Engine.height - 95, 200, 50, tutorialDialog);
    this.dialog.setPixelSize(2);
    this.dialog.setStepCallback(this.nextStep);

  }

  nextStep(step) {
    if(step === 0 || step === 10) {
      this.indicator = new Indicator(80, 80, 140, 140);
    } else {
      this.indicator = null;
    }
  }

  moved(x, y) {
    let i;
    for (i = 0 ; i < this.levels.length ; i += 1) {
      if (this.levels[i].state === 0 && this.levels[i].inRange(x, y)) {
        this.levels[i].setHover();
        break;
      } else if (this.levels[i].state === 1 && !this.levels[i].inRange(x, y)) {
        this.levels[i].setNormal();
        break;
      }
    }

    this.dialog.moved(x, y);
  }

  released() {

  }

  pressed(x, y) {
    let i;
    for (i = 0 ; i < this.levels.length ; i += 1) {
      if (this.levels[i].inRange(x, y)) {
        this.levels[i].goToLevel();
        break;
      }
    }
    if (this.dialog.inRange(x, y)) {
      this.dialog.pressed(x, y);
    }
  }

  update() {
    if (this.indicator) {
      this.indicator.update();
    }

    if (this.dialog) {
      this.dialog.update();
    }
  }

  render(context) {
    this.background.render(context);
    let i;
    for (i = 0 ; i < this.levels.length ; i += 1) {
      this.levels[i].render(context);
    }
    this.scientist.render(context);
    if (this.indicator) {
      this.indicator.render(context);
    }
    if (this.dialog) {
      this.dialog.render(context)
    }
  }
}