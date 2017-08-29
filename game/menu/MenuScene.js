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
    this.textFinished = this.textFinished.bind(this);
    this.continueClicked = this.continueClicked.bind(this);
    this.onYes = this.onYes.bind(this);
    this.onNo = this.onNo.bind(this);
    this.restartLevel = this.restartLevel.bind(this);

    this.background = new Background(0, 0, Engine.width, Engine.height);

    this.scientist = new Scientist(Engine.width / 2 - 200, Engine.height / 2 - 75, 100, 150);
    this.dialog = new Dialog(Engine.width / 2, Engine.height / 2 - 75, 300, 100);
    this.dialog.setPixelSize(3);
    this.dialog.setCallback(this.textFinished);

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
      "You are not?",               // 9
      "What are you doing here?",   // 10
      "Security! Security!",        // 11
      "Splendid, my dear lad!",     // 12
      "You will help me out!",      // 13
      "...",
      "Everything is lost!",
      "Every label displaced!",
      "Every blackbox unmarked",
      "Every battery taken out!",
      "Good thing I marked all of the blackboxes",
      "Or we wouldn't even know what's inside",
      "OK then.",
      "Let's get down to business",
      ""
    ];

    this.decisionTree = [
      [8, 12, 9]
    ];

    this.currentDecision = 0;

    this.end = [
      11
    ];

    this.finished = 20;

    this.currentText = 0;

    this.dialog.textToLoad(this.texts[this.currentText]);

    this.yes = new Button(Engine.width / 2, Engine.height / 2 + 20, 50, 20,
      'yes', undefined, undefined, this.onYes);

    this.no = new Button(Engine.width / 2 + 250, Engine.height / 2 + 20, 50, 20,
      'no', undefined, undefined, this.onNo);

    this.continue = new Button(Engine.width / 2 + 250, Engine.height / 2 + 20, 50, 20,
      '[...]', undefined, undefined, this.continueClicked);

    this.skip = new Button(Engine.width - 125, 25, 100, 30,
      'skip & play', undefined, undefined, this.onSkip);

    this.dialogEnabled = false;
    this.choiceEnabled = false;
    this.continueEnabled = false;

    this.ticksPassed = 0;
  }

  textFinished() {
    if (this.currentText === this.finished) {
      this.continue.text = 'play';
    }

    if(this.end.indexOf(this.currentText) !== -1) {
      this.skip.text = 'restart';
      this.skip.onClick = this.restartLevel;
      return;
    }

    if (this.currentText === this.decisionTree[this.currentDecision][0]) {
      this.choiceEnabled = true;
      return;
    }

    this.continueEnabled = true;
  }

  onYes() {
    this.choiceEnabled = false;
    this.currentText = this.decisionTree[this.currentDecision][1];
    this.dialog.textToLoad(this.texts[this.currentText]);
  }

  onNo() {
    this.choiceEnabled = false;
    this.currentText = this.decisionTree[this.currentDecision][2];
    this.dialog.textToLoad(this.texts[this.currentText]);
  }

  continueClicked() {
    this.continueEnabled = false;

    if(this.currentText === this.finished) {
      this.moveToLevelChoice();
    } else {
      this.currentText += 1;
      this.dialog.textToLoad(this.texts[this.currentText]);
    }
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
    Engine.setScene(new LevelScene());
    Engine.startScene();
  }

  moved(x, y) {
    if (this.choiceEnabled && this.yes.state === 0 && this.yes.inRange(x, y)) {
      this.yes.setHover();
    } else if (this.choiceEnabled && this.yes.state === 0 && this.no.inRange(x, y)) {
      this.no.setHover();
    } else if (this.continueEnabled && this.continue.state === 0 && this.continue.inRange(x, y)) {
      this.continue.setHover();
    } else if (this.skip.state === 0 && this.skip.inRange(x, y)) {
      this.skip.setHover();
    }

    if (this.choiceEnabled && this.yes.state === 1 && !this.yes.inRange(x, y)) {
      this.yes.setNormal();
    } else if (this.choiceEnabled && this.no.state === 1 && !this.no.inRange(x, y)) {
      this.no.setNormal();
    } else if (this.continueEnabled && this.continue.state === 1 && !this.continue.inRange(x, y)) {
      this.continue.setNormal();
    } else if (this.skip.state === 1 && !this.skip.inRange(x, y)) {
      this.skip.setNormal();
    }
  }

  released() {

  }

  pressed(x, y) {
    if (this.choiceEnabled && this.yes.inRange(x, y)) {
      this.yes.click();
    } else if (this.choiceEnabled && this.no.inRange(x, y)) {
      this.no.click();
    } else if (this.continue.inRange(x, y)) {
      this.continue.click();
    } else if (this.skip.inRange(x, y)) {
      this.skip.click();
    } else if (this.dialogEnabled) {
      this.dialog.loadText();
      this.textFinished();
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

    if (this.continueEnabled) {
      this.continue.render(context);
    }

    if (this.choiceEnabled) {
      this.yes.render(context);
      this.no.render(context);
    }

    this.skip.render(context);
  }
}