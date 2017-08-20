import GameLoop from './GameLoop';

let instance = null;

class EngineImplementation {
  setup(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');

    this.loop = new GameLoop(60);
    this.scene = null;
  }

  setScene(newScene) {
    this.scene = newScene
  }

  startScene() {
    this.loop.start(this.scene);
  }

  removeScene() {
    this.loop.stop();
    this.scene.unload();
    this.scene = null;
  }
}

class Engine {
  constructor() {
    if (instance === null) {
      instance = new EngineImplementation()
    }

    return instance;
  }
}

export default new Engine()