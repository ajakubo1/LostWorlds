import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import Scientist from "./objects/Scientist";
import Dialog from "./objects/Dialog";
import Button from "../core/Button";
import LevelScene from "../level/LevelScene";

export default class MenuScene extends Scene {
  constructor() {
    super();

    this.onSkip = this.onSkip.bind(this);

    this.restartLevel = this.restartLevel.bind(this);
    this.moveToLevelChoice = this.moveToLevelChoice.bind(this);

    this.background = new Background(0, 0, Engine.width, Engine.height);

    this.scientist = new Scientist(Engine.width / 2 - 200, Engine.height / 2 - 75, 100, 150);

    this.texts = [
      "Oh, what a mess!",           // 0
      "How did this happen?",       // 1
      "I cannot believe it!",       // 2
      "My lab is wrecked!",         // 3
      "This is what I get for hiring an intern!",   // 4
      "...",                        // 5
      "Oh, you there!",             // 6
      "Yes you!",                   // 7
      "Are you the new intern?",    // 8
      "Splendid, my dear lad!",     // 12
      "You will help me out!",      // 13
      "...",                        // 14
      "Everything bit of data is lost!", // 15
      "Every label displaced!", // 16
      "Every battery taken out!", // 17
      "Good thing I marked all of the blackboxes", // 18
      "Or we wouldn't even know what's inside", // 19
      "OK then. Blackboxes... Let me explain.", // 20
    ];

    this.dialog = new Dialog(
      Engine.width / 2, Engine.height / 2 - 75, 300, 100, this.texts
    );
    this.dialog.setPixelSize(3);
    this.dialog.setFinishedCallback(this.moveToLevelChoice);

    this.skip = new Button(Engine.width - 125, 25, 100, 30,
      'skip & play', undefined, undefined, this.onSkip);

    this.dialogEnabled = false;

    this.ticksPassed = 0;
  }

  onSkip() {
    this.moveToLevelChoice();
  }

  restartLevel() {
    Engine.removeScene();
    Engine.setScene(new MenuScene());
    Engine.startScene();
  }

  moveToLevelChoice() {
    Engine.removeScene();
    Engine.setScene(new LevelScene(0));
    Engine.startScene();
  }

  moved(x, y) {
    if (this.skip.state === 0 && this.skip.inRange(x, y)) {
      this.skip.setHover();
    } else if (this.skip.state === 1 && !this.skip.inRange(x, y)) {
      this.skip.setNormal();
    } else {
      this.dialog.moved(x, y)
    }
  }

  released() {

  }

  pressed(x, y) {
    if (this.dialog.inRange(x, y)) {
      this.dialog.pressed(x, y);
    } else if (this.skip.inRange(x, y)) {
      this.skip.click();
    } else if (this.dialogEnabled) {
      this.dialog.loadText();
    }
  }

  update() {
    this.ticksPassed += 1;

    if (this.ticksPassed === 100 && !this.dialogEnabled) {
      this.dialogEnabled = true;
    }

    if (this.dialogEnabled) {
      this.dialog.update();
    }

  }

  render(context) {
    this.background.render(context);
    this.scientist.render(context);
    if (this.dialogEnabled) {
      this.dialog.render(context);
    }
    this.skip.render(context);
  }
}