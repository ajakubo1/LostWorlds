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

export const createOpaqSquare = (width, height, color, borderColor, borderSize, alpha, x = 0, y = 0) => {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const b = borderColor === null ? 2 : borderSize;
  const w = width - 2 * x - 2 * b;
  const h = height - 2 * y - 2 * b;

  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.fillRect(b, b, w, h);
  context.globalAlpha = 1;

  if (borderColor) {
    context.strokeStyle = borderColor;
    context.lineWidth = borderSize;
    context.strokeRect(b + x, b + y, w, h);
  }

  return canvas;
};

export const createOpaqCircle = (width, height, range, color, borderColor, borderSize, alpha) => {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const centerX = width / 2;
  const centerY = height / 2;

  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.arc(centerX,centerY,range,0,2*Math.PI);
  context.fill();
  context.globalAlpha = 1;

  if (borderColor) {
    context.strokeStyle = borderColor;
    context.lineWidth = borderSize;
    context.arc(centerX,centerY,range,0,2*Math.PI);
    context.stroke();
  }

  return canvas;
};