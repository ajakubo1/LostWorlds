import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import SpaceScene from "../../space/SpaceScene";

export default class LevelSquare extends Renderable {

  constructor(x, y, width, height, level) {
    super(x, y, width, height);
    this.state = 0;
    this.level = level;
  }

  setNormal() {
    this.state = 0;
    this.image = Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE);
  }

  setHover() {
    this.state = 1;
    this.image = Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE_ACTIVE);
  }

  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE);
  }

  setInfo(info) {
    this.info = info;
  }

  goToLevel() {
    Engine.removeScene();
    Engine.setScene(new SpaceScene(this.info, this.level));
    Engine.startScene();
  }
}