const letters = {
  'a': [
    [, 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1]
  ],
  'b': [
    [1, 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1],
    [1, 1]
  ],
  'c': [
    [1, 1, 1],
    [1],
    [1],
    [1],
    [1, 1, 1]
  ],
  'd': [
    [1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1]
  ],
  'e': [
    [1, 1, 1],
    [1],
    [1, 1, 1],
    [1],
    [1, 1, 1]
  ],
  'f': [
    [1, 1, 1],
    [1],
    [1, 1],
    [1],
    [1]
  ],
  'g': [
    [, 1, 1],
    [1],
    [1, , 1, 1],
    [1, , , 1],
    [, 1, 1]
  ],
  'h': [
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1],
    [1, , 1]
  ],
  'i': [
    [1, 1, 1],
    [, 1],
    [, 1],
    [, 1],
    [1, 1, 1]
  ],
  'j': [
    [1, 1, 1],
    [, , 1],
    [, , 1],
    [1, , 1],
    [1, 1, 1]
  ],
  'k': [
    [1, , , 1],
    [1, , 1],
    [1, 1],
    [1, , 1],
    [1, , , 1]
  ],
  'l': [
    [1],
    [1],
    [1],
    [1],
    [1, 1, 1]
  ],
  'm': [
    [1, 1, 1, 1, 1],
    [1, , 1, , 1],
    [1, , 1, , 1],
    [1, , , , 1],
    [1, , , , 1]
  ],
  'n': [
    [1, , , 1],
    [1, 1, , 1],
    [1, , 1, 1],
    [1, , , 1],
    [1, , , 1]
  ],
  'o': [
    [1, 1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1]
  ],
  'p': [
    [1, 1, 1],
    [1, , 1],
    [1, 1, 1],
    [1],
    [1]
  ],
  'q': [
    [0, 1, 1],
    [1, , , 1],
    [1, , , 1],
    [1, , 1, 1],
    [1, 1, 1, 1]
  ],
  'r': [
    [1, 1],
    [1, , 1],
    [1, , 1],
    [1, 1],
    [1, , 1]
  ],
  's': [
    [1, 1, 1],
    [1],
    [1, 1, 1],
    [, , 1],
    [1, 1, 1]
  ],
  't': [
    [1, 1, 1],
    [, 1],
    [, 1],
    [, 1],
    [, 1]
  ],
  'u': [
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1]
  ],
  'v': [
    [1, , , , 1],
    [1, , , , 1],
    [, 1, , 1],
    [, 1, , 1],
    [, , 1]
  ],
  'w': [
    [1, , , , 1],
    [1, , , , 1],
    [1, , 1, , 1],
    [1, , 1, , 1],
    [1, 1, 1, 1, 1]
  ],
  'x': [
    [1, , , , 1],
    [, 1, , 1],
    [, , 1],
    [, 1, , 1],
    [1, , , , 1]
  ],
  'y': [
    [1, , 1],
    [1, , 1],
    [, 1],
    [, 1],
    [, 1]
  ],
  'z': [
    [1, 1, 1, 1, 1],
    [, , , 1],
    [, , 1],
    [, 1],
    [1, 1, 1, 1, 1]
  ],
  '2': [
    [, 1],
    [1, ,1 ],
    [, 1],
    [1,],
    [1, 1, 1]
  ],
  '9': [
    [, 1, ],
    [1, , 1],
    [, 1, 1],
    [, ,1],
    [,1,]
  ],
  '0': [
    [,1,],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [,1,]
  ],
  '&': [
    [,1,1],
    [1, , ],
    [, 1, , 1],
    [1, ,1],
    [,1, , 1]
  ],
  ' ': [
    [0],
    [0],
    [0],
    [0],
    [0],
  ],
  '1': [
    [,,1],
    [,1, 1],
    [1,,1],
    [,,1],
    [,,1],
  ],
  '!': [
    [1],
    [1],
    [1],
    [,],
    [1],
  ],
  '?': [
    [,1, 1],
    [1,,, 1],
    [,, 1,,],
    [, , ,],
    [, , 1],
  ],
  ',': [
    [,],
    [,],
    [,],
    [,],
    [1],
    [1],
  ],
  '.': [
    [,],
    [,],
    [,],
    [,],
    [1],
  ],
  '\'': [
    [1],
    [1],
    [,],
    [,],
    [,],
  ],
  '[': [
    [1, 1],
    [1],
    [1],
    [1],
    [1],
    [1, 1],
  ],
  ']': [
    [1, 1],
    [,1],
    [,1],
    [,1],
    [,1],
    [1, 1],
  ],
  '-': [
    [,],
    [,],
    [1, 1],
    [,],
    [,],
  ],
};

const getWidth = (letter) => {
  let i;
  let max = 0;
  for (i = 0 ; i < letter.length; i += 1) {
    if (letter[i].length > max) {
      max = letter[i].length;
    }
  }
  return max;
};

const sum = (arr) => {
  let i;
  let sum = 0;
  for (i = 0 ; i < arr.length; i += 1) {
    sum += arr[i];
  }
  return sum;
};

export const fillText = (globalX, globalY, width, height, word, context, color, size) => {
  word = word.toLowerCase();
  let needed = [], i, j;

  let textWidth = [];
  let textInRow = [];
  let rowWidth = [];

  for (i = 0; i < word.length; i++) {
    const letter = letters[word.charAt(i)];
    if (letter) {
      needed.push(letter);
      textWidth.push(size * (getWidth(letter) + 1));
      if (sum(textWidth) > width * 0.9) {
        let inc = 0;
        while (word.charAt(i - inc) !== ' ' && inc <= needed.length) {
          inc += 1;
        }

        if (inc >= needed.length) {
          inc = 0;
        }

        i = i - inc;

        if (inc > 0) {
          textWidth.splice(-inc);
          needed.splice(-inc);
        }

        rowWidth.push(sum(textWidth));
        textWidth = [];
        textInRow.push(needed);
        needed = [];
      }
    }
  }

  textInRow.push(needed);
  rowWidth.push(sum(textWidth));

  context.fillStyle = color;

  for(j = 0; j < textInRow.length; j += 1) {
    needed = textInRow[j];
    let currX = 0;
    for (i = 0; i < needed.length; i++) {
      let letter = needed[i];
      let currY = 0;
      let addX = 0;
      for (let y = 0; y < letter.length; y++) {
        let row = letter[y];
        for (let x = 0; x < row.length; x++) {
          if (row[x]) {
            context.fillRect(
              globalX + (width - rowWidth[j]) / 2 + currX + x * size,
              globalY + (j + 1) * (height / (textInRow.length + 1)) - 5 * size / 2 + currY,
              size, size);
          }
        }
        addX = Math.max(addX, row.length * size);
        currY += size;
      }
      currX += size + addX;
    }
  }
};