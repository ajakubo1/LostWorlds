export default class GameLoop {
  constructor(ops) {
    this.timeUPS = 1000.0 / ops;
    this.running = false;
  }

  _render() {
    console.info('_render')
  }

  _update() {
    console.info('_update')
  }

  start() {
    this.running = true;
    window.requestAnimationFrame(this._render);
    setTimeout(this._update, 0);
  }

  stop() {
    this.running = false;
  }
}