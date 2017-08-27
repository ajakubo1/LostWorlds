import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import LevelSquare from "./objects/LevelSquare";

export default class LevelScene extends Scene {
  constructor() {
    super();
    this.background = new Background(0, 0, Engine.width, Engine.height);
    this.levels = [];
    let i;
    const levels = Engine.globals.levels;
    for (i = 0 ; i < levels.length ; i += 1) {
      const level = levels[i];
      if (level.open) {
        const square = new LevelSquare(100 + i * 125, 25, 100, 100);
        square.setInfo(level);
        this.levels.push(square);
      } else {
        break;
      }
    }
  }

  moved(x, y) {

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
  }

  update() {

  }

  render(context) {
    this.background.render(context);
    let i;
    for (i = 0 ; i < this.levels.length ; i += 1) {
      this.levels[i].render(context);
    }
  }
}