import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import LevelSquare from "./objects/LevelSquare";
import Scientist from "../menu/objects/Scientist";
import Indicator from "./objects/Indicator";

const tutorialDialog = [
  "welcome to my lab!",
  "this is a blackbox",
  "it's essentially a microscopic universe",
  "well... in a box.",
  "it helps me in sciency stuff",
  "go ahead! take a look!",
];

export default class LevelScene extends Scene {
  constructor(dialog = 99) {
    super();

    this.nextStep = this.nextStep.bind(this);

    this.background = new Background(0, 0, Engine.width, Engine.height);
    this.levels = [];
    let i;
    const levels = Engine.globals.levels;
    for (i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      if (level.open) {
        const y = Math.floor(i / 6);
        const square = new LevelSquare(100 + i % 6 * 125, 100 + y * 125, 100, 100, i);
        square.setInfo(level);
        this.levels.push(square);
      } else {
        break;
      }
    }
    let text = null;
    if (dialog === 0) {
      text = tutorialDialog;
    }
    this.scientist = new Scientist(Engine.width / 2 - 50, Engine.height - 95, text, 4, 2);
    if (dialog === 0) {
      this.scientist.setDialogStepCallback(this.nextStep);
    }
  }

  nextStep(step) {
    if(step === 0 || step === 4) {
      this.indicator = new Indicator(this.levels[0]);
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

    this.scientist.moved(x, y);
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
    this.scientist.pressed(x, y);
  }

  update() {
    if (this.indicator) {
      this.indicator.update();
    }
    this.scientist.update();
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
  }
}