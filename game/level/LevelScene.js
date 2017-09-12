import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import LevelSquare from "./objects/LevelSquare";
import Scientist from "../menu/objects/Scientist";
import Indicator from "./objects/Indicator";
import {fillText} from "../core/Letters";

const tutorialDialog = [
  "welcome to my lab!",
  "this is a blackbox",
  "yes, i know it's purple",
  "it's essentially a microscopic universe",
  "well... in a box.",
  "anyway - it helps me in sciency stuff",
  "go ahead! take a look!",
];

const finishedDialog = [
  "well done!",
  "you sorted out all of the blackboxes!"
];

export default class LevelScene extends Scene {
  constructor(dialog = 99) {
    super();

    this.nextStep = this.nextStep.bind(this);

    this.background = new Background(0, 0, Engine.width, Engine.height);
    this.levels = [];
    let i;
    const levels = Engine.globals.levels;
    let doneLevels = 0;
    for (i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      if (level.open) {
        const y = Math.floor(i / 6);
        this.levels.push(new LevelSquare(100 + i % 6 * 125, 100 + y * 125, 100, 100, i, level));
      } else {
        break;
      }

      if (!Engine.globals.finished && level.done) {
        doneLevels += 1;
      }
    }
    let text = null;
    if (!dialog) {
      text = tutorialDialog;
    } else if (doneLevels === 12) {
      text = finishedDialog;
      Engine.globals.finished = true;
    }
    this.scientist = new Scientist(Engine.width / 2 - 50, Engine.height - 95, text, 4, 2);
    if (!dialog) {
      this.scientist.setDialogStepCallback(this.nextStep);
    }
  }

  nextStep(step) {
    if(step === 0 || step > 4) {
      this.indicator = new Indicator(this.levels[0]);
    } else {
      this.indicator = null;
    }
  }

  moved(x, y) {
    let i;
    for (i = 0 ; i < this.levels.length ; i += 1) {
      this.levels[i].moved(x, y);
    }

    this.scientist.moved(x, y);
  }

  released() {

  }

  pressed(x, y) {
    let i;
    for (i = 0 ; i < this.levels.length ; i += 1) {
      this.levels[i].pressed(x, y);
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

    fillText(0, 0, Engine.width, 60, "blackbox: lost particles", context, "#ffffff", 5);
    fillText(0, 350, Engine.width / 2, 60, "Won: " + Engine.globals.won, context, "#ffffff", 3);
    fillText(Engine.width / 2, 350, Engine.width / 2, 60, "Lost: " + Engine.globals.lost, context, "#ffffff", 3);
  }
}