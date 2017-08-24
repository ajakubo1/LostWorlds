const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const createSquare = (width, height, color, borderColor = null) => {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const b = borderColor === null ? 2 : 4;
  const w = width - 2 * b;
  const h = height - 2 * b;

  context.fillStyle = color;
  context.fillRect(b, b, w, h);

  return canvas;
};