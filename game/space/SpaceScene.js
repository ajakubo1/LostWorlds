import Scene from '../core/Scene';
import Engine from '../core/Engine';

export default class SpaceScene extends Scene {

  constructor() {
    super();
  }

  update() {

  }

  render(context) {
    context.clearRect(0, 0, Engine.width, Engine.height);

    context.fillRect(0, 0, Engine.width, Engine.height);
  }


}