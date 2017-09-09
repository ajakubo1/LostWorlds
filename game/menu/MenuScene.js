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
    this.moveCloser = this.moveCloser.bind(this);

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


    this.texts1 = [
      "Oh, what a mess!",           // 0
      "My lab is wrecked!",         // 3
      "Someone opened the cages once again!",   // 4
      "Bloody monkeys escaped!"
    ];
    this.texts2 = [ "Oh, and who are you?!",             // 6
      "Yes you!",                   // 7
      "I have never seen you here!",                   // 7
      "Are you the new intern?",    // 8
      "Splendid!",     // 12
      "You will help me out!",      // 13
      "I've lost all of the data", // 15
      "Good thing I know what's in each of the blackbox", // 18
      "Follow me" // 20
    ];

    this.scientist = new Scientist(
      Engine.width / 2 - 200, Engine.height / 2 - 75, this.texts1, 8, 3
    );

    this.scientist.setDialogFinishedCallback(this.moveCloser);

    this.skip = new Button(Engine.width - 125, 25, 100, 30,
      'skip & play', '#121212', '#424242', this.onSkip);
  }

  onSkip() {
    this.moveToLevelChoice();
  }

  moveCloser() {
    this.scientist = new Scientist(
      100, Engine.height / 2, this.texts2, 16, 5
    );

    this.scientist.setDialogFinishedCallback(this.moveToLevelChoice);
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
    this.skip.moved(x, y);
    this.scientist.moved(x, y)
  }

  released() {

  }

  pressed(x, y) {
    this.skip.pressed(x, y);
    this.scientist.pressed(x, y);
  }

  update() {
    this.scientist.update();
  }

  render(context) {
    this.background.render(context);
    this.scientist.render(context);
    this.skip.render(context);
  }
}