import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import SpaceScene from "../../space/SpaceScene";
import {fillText} from "../../core/Letters";
import Button from "../../core/Button";

export default class LevelSquare extends Button {

  constructor(x, y, width, height, level, info) {
    super(x, y, width, height);
    this.info = info;
    this.state = 0;
    this.level = level;
    this.onClick = this.goToLevel;
  }

  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE);
  }

  render(context) {
    let image = this.image;
    if (this.info.done) {
      image = Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE_DONE);
    }
    if (this.state) {
      image = Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE_ACTIVE);
    }
    context.drawImage(image, this.x, this.y, this.width, this.height);

    fillText(this.x, this.y, this.width, this.height, (this.level + 1) + '', context, '#ffffff', 2)
  }

  goToLevel() {
    Engine.removeScene();
    Engine.setScene(new SpaceScene(this.info, this.level));
    Engine.startScene();
  }
}