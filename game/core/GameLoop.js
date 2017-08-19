export default class GameLoop {
  constructor(ops, context) {
    this.timeUPS = 1000.0 / ops;
    this.running = false;
    this.lastUpdateTime = null;
    this._render = this._render.bind(this);
    this._update = this._update.bind(this);
    this.context = context;

    this.scene = null;
  }

  _render() {
    this.scene.render(this.context);

    if (this.running) {
      window.requestAnimationFrame(this._render);
    }
  }

  _update() {
    let lastUpdateTimedelta = window.performance.now() - this.lastUpdateTime;
    while (lastUpdateTimedelta > this.timeUPS) {
      this.scene.update();
      this.lastUpdateTime += this.timeUPS;
      lastUpdateTimedelta -= this.timeUPS;
    }

    if (this.running) {
      setTimeout(this._update, 0);
    }
  }

  start(scene) {
    this.running = true;
    this.scene = scene;
    window.requestAnimationFrame(this._render);

    this.lastUpdateTime = window.performance.now();
    setTimeout(this._update, this.timeUPS);
  }

  stop() {
    this.running = false;
  }
}