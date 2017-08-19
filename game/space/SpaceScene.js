import Scene from '../core/Scene';

export default class SpaceScene extends Scene {

  constructor() {
    super();
  }

  update() {

  }

  render(context) {
    context.clearRect(0, 0, 1000, 1000);

    context.fillRect(0, 0, 1000, 1000);
  }


}