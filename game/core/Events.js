import Engine from "./Engine";

export default class Events {
  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }


  addOnPressEvent (element, callback) {
    this.finished = callback;
    this.element = element;
    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mousemove', this.onMouseMove);
  }

  removeOnPressEvent () {
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.finished = null;
    this.element = null;
  }

  callbackPressed(x, y) {
    this.finished.pressed(x, y);
  }

  callbackReleased() {
    this.finished.released();
  }

  callbackMoved(x, y) {
    this.finished.moved(x, y);
  }

  onMouseDown(event) {
    console.info(event);
    const x = (event.clientX / event.target.offsetWidth) * Engine.width;
    const y = (event.clientY / event.target.offsetHeight) * Engine.height;

    this.element.addEventListener('mouseup', this.onMouseUp);
    this.element.addEventListener('mouseleave', this.onMouseLeave);
    this.callbackPressed(x, y);
  }

  onMouseMove(event) {
    const x = (event.clientX / event.target.offsetWidth) * Engine.width;
    const y = (event.clientY / event.target.offsetHeight) * Engine.height;
    this.callbackMoved(x, y);
  }

  onMouseUp(event) {
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    this.callbackReleased();
  }

  onMouseLeave(event) {
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    this.callbackReleased();
  }
}