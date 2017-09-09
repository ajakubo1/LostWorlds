import Engine from "./Engine";

export default class Events {
  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUpLeave = this.onMouseUpLeave.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEndCancel = this.onTouchEndCancel.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.isMobile = false;
  }


  addOnPressEvent (element, callback) {
    this.finished = callback;
    this.element = element;
    if (!this.isMobile) {
      this.element.addEventListener('mousedown', this.onMouseDown);
      this.element.addEventListener('mousemove', this.onMouseMove);
    }
    this.element.addEventListener('touchstart', this.onTouchStart);
  }

  removeOnPressEvent () {
    if (!this.isMobile) {
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element.removeEventListener('mousemove', this.onMouseMove);
    }
    this.element.removeEventListener('touchstart', this.onTouchStart);
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
    const x = (event.clientX / event.target.offsetWidth) * Engine.width;
    const y = (event.clientY / event.target.offsetHeight) * Engine.height;

    this.element.addEventListener('mouseup', this.onMouseUpLeave);
    this.element.addEventListener('mouseleave', this.onMouseUpLeave);
    this.callbackPressed(x, y);
  }

  onMouseMove(event) {
    const x = (event.clientX / event.target.offsetWidth) * Engine.width;
    const y = (event.clientY / event.target.offsetHeight) * Engine.height;
    this.callbackMoved(x, y);
  }

  onMouseUpLeave(event) {
    this.element.removeEventListener('mouseup', this.onMouseUpLeave);
    this.element.removeEventListener('mouseleave', this.onMouseUpLeave);
    this.callbackReleased();
  }

  onTouchStart(event) {
    if (!this.isMobile) {
      this.isMobile = true;
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element.removeEventListener('mousemove', this.onMouseMove);
      this.element.removeEventListener('mouseup', this.onMouseUpLeave);
      this.element.removeEventListener('mouseleave', this.onMouseUpLeave);
    }

    const x = (event.touches[0].clientX / event.target.offsetWidth) * Engine.width;
    const y = (event.touches[0].clientY / event.target.offsetHeight) * Engine.height;

    this.element.addEventListener('touchmove', this.onTouchMove);
    this.element.addEventListener('touchend', this.onTouchEndCancel);
    this.element.addEventListener('touchcancel', this.onTouchEndCancel);
    this.callbackPressed(x, y);
  }

  onTouchEndCancel(event) {
    this.element.removeEventListener('touchmove', this.onTouchMove);
    this.element.removeEventListener('touchend', this.onTouchEndCancel);
    this.element.removeEventListener('touchcancel', this.onTouchEndCancel);
    this.callbackReleased();
  }

  onTouchMove(event) {
    const x = (event.touches[0].clientX / event.target.offsetWidth) * Engine.width;
    const y = (event.touches[0].clientY / event.target.offsetHeight) * Engine.height;
    this.callbackMoved(x, y);
  }
}