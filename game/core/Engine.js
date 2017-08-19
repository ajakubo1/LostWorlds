import GameLoop from './GameLoop';

export default class Engine {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');

    this.loop = new GameLoop(60);

    this.loop.start();
  }
}