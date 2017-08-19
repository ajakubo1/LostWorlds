export default class GameLoop {
  constructor(ops) {
    this.timeUPS = 1000.0 / ops;
    this.running = false;
    this.lastUpdateTime = null;
    this._render = this._render.bind(this);
    this._update = this._update.bind(this);
  }

  _render() {
    //TODO here I should run all of the render stuff

    if (this.running) {
      window.requestAnimationFrame(this._render);
    }
  }

  _update() {
    let lastUpdateTimedelta = window.performance.now() - this.lastUpdateTime;
    while (lastUpdateTimedelta > this.timeUPS) {
      //TODO - here I should call update function
      this.lastUpdateTime += this.timeUPS;
      lastUpdateTimedelta -= this.timeUPS;
    }

    if (this.running) {
      setTimeout(this._update, 0);
    }
  }

  start() {
    this.running = true;

    window.requestAnimationFrame(this._render);

    this.lastUpdateTime = window.performance.now();
    setTimeout(this._update, this.timeUPS);
  }

  stop() {
    this.running = false;
  }
}