import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import SpaceScene from "../../space/SpaceScene";

export default class LevelSquare extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.LEVEL_SQUARE)
  }

  setInfo(info) {
    this.info = info;
  }

  goToLevel() {
    Engine.removeScene();
    Engine.setScene(new SpaceScene(this.info));
    Engine.startScene();
  }
}