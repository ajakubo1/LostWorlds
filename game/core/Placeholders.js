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

export const drawCat = () =>{
  const canvas = createOpaqCircle(50, 50, 12, '#aa4400', '#aa4400', 1, 0.6);
  let context = canvas.getContext('2d');

  context.drawImage(
    createOpaqCircle(50, 50, 8, '#aa4400', '#aa4400', 1, 0.6),
    -10, -10
  );
  const ear = createOpaqCircle(50, 50, 5, '#aa4400', '#aa4400',
    1, 0.6, 3 * Math.PI / 4, Math.PI + 3 * Math.PI / 4)
  context.drawImage(
    ear,
    -10, -20
  );

  context.drawImage(
    ear,
    -1, -20
  );

  const foot = createOpaqCircle(50, 50, 5, '#aa4400', '#aa4400', 1, 0.6, Math.PI)
  context.drawImage(
    foot,
    6, 15
  );

  context.drawImage(
    foot,
    -6, 15
  );

  const toReturn = createCanvas(50, 50);

  context = toReturn.getContext('2d');
  context.drawImage(
    canvas,
    5, 5
  );

  return toReturn;
};

  export const createOpaqCircle = (width, height, range, color, borderColor, borderSize, alpha, s = 0, d = 2*Math.PI) => {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const centerX = width / 2;
  const centerY = height / 2;

  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.arc(centerX,centerY,range,s,d);
  context.fill();
  context.globalAlpha = 1;

  if (borderColor) {
    context.strokeStyle = borderColor;
    context.lineWidth = borderSize;
    context.stroke();
  }

  return canvas;
};