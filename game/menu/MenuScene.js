import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import Scientist from "./objects/Scientist";
import Dialog from "./objects/Dialog";
import Button from "../core/Button";
import LevelScene from "../level/LevelScene";
import {createSquare} from "../core/Placeholders";
import { TYPES as ASSET_TYPES, IDENTIFIERS as ASSET_IDENTIFIERS } from '../core/Assets';

export default class MenuScene extends Scene {
  constructor() {
    super();

    this.onSkip = this.onSkip.bind(this);

    this.moveToLevelChoice = this.moveToLevelChoice.bind(this);

    this.background = new Background(0, 0, Engine.width, Engine.height);

    let context = this.background.image.getContext('2d');

    context.lineWidth = 5;
    context.fillStyle = '#888888';
    context.strokeStyle = "#000000";
    context.moveTo(0, Engine.height);
    context.lineTo(200, Engine.height - 200);
    context.lineTo(Engine.width - 200, Engine.height - 200);
    context.lineTo(Engine.width, Engine.height);
    context.lineTo(0, Engine.height);

    context.fill();

    context.moveTo(200, Engine.height - 200);
    context.lineTo(200, 0);

    context.moveTo(Engine.width - 200, Engine.height - 200);
    context.lineTo(Engine.width - 200, 0);

    context.stroke();

    this.scientist = new Scientist(Engine.width / 2 - 200, Engine.height / 2 - 75, 100, 150);

    this.texts = [
      "Oh, what a mess!",           // 0
      "How did this happen?",       // 1
      "I cannot believe it!",       // 2
      "My lab is wrecked!",         // 3
      "Garry must've opened the cages once again!",   // 4
      "You know, the ones with monkeys...",                        // 5
      "Oh, and who are you?!",             // 6
      "Yes you!",                   // 7
      "I have never seen you here!",                   // 7
      "Are you the new intern?",    // 8
      "Splendid, my dear lad!",     // 12
      "You will help me out!",      // 13
      "Every bit of data is lost!", // 15
      "Every label displaced!", // 16
      "Every battery taken out!", // 17
      "Good thing I marked all of the blackboxes", // 18
      "Or we wouldn't even know what's inside", // 19
      "OK then. Blackboxes... Let me explain.", // 20
    ];

    this.dialog = new Dialog(
      Engine.width / 2, Engine.height / 2 - 75, 350, 100, this.texts
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

  moveToLevelChoice() {
    Engine.removeScene();
    Engine._putAsset(
      ASSET_IDENTIFIERS.BACKGROUND,
      createSquare(960, 540, '#111111'),
      ASSET_TYPES.PLACEHOLDER
    );
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
    if (this.ticksPassed < 100) {
      this.ticksPassed += 1;
    }

    if (this.ticksPassed === 100 && !this.dialogEnabled) {
      this.dialogEnabled = true;
    }

    if (this.dialogEnabled) {
      this.dialog.update();
    }


    this.scientist.update();
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