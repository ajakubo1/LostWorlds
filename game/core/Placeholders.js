const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const createSquare = (width, height, color, borderColor = null) => {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const b = borderColor === null ? 2 : 0;
  const w = width - 2 * b;
  const h = height - 2 * b;

  context.fillStyle = color;
  context.fillRect(b, b, w, h);
};

let placeholders = null;

class Placeholders {
  constructor() {
    if (placeholders === null) {
      placeholders = new Placeholders();
    }

    return placeholders;
  }
}

export default new Placeholders();