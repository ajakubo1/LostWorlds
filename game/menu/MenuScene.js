import Scene from '../core/Scene';
import Engine from '../core/Engine';
import Background from '../space/objects/Background';
import Scientist from "./objects/Scientist";
import Button from "../core/Button";
import LevelScene from "../level/LevelScene";
import {createSquare} from "../core/Placeholders";
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../core/Assets';

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
      "oh, what a mess!",           // 0
      "my lab is wrecked!",         // 3
      "someone opened the cages once again!",   // 4
      "bloody monkeys escaped!"
    ];
    this.texts2 = [ "oh, and who are you?!",             // 6
      "yes you!",                   // 7
      "i have never seen you here!",                   // 7
      "are you the new intern?",    // 8
      "splendid!",     // 12
      "you will help me out!",      // 13
      "i've lost all of the data", // 15
      "good thing i know what's in each of the blackbox", // 18
      "follow me" // 20
    ];

    this.scientist = new Scientist(
      Engine.width / 2 - 200, Engine.height / 2 - 75, this.texts1, 8, 3
    );

    this.scientist.setDialogFinishedCallback(this.moveCloser);

    this.skip = new Button(Engine.width - 125, 25, 100, 30,
      'skip & play', this.onSkip);
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