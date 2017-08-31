const letters = {
  'A': [
    [, 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1]
  ],
  'B': [
    [1, 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1],
    [1, 1]
  ],
  'C': [
    [1, 1, 1],
    [1],
    [1],
    [1],
    [1, 1, 1]
  ],
  'D': [
    [1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1]
  ],
  'E': [
    [1, 1, 1],
    [1],
    [1, 1, 1],
    [1],
    [1, 1, 1]
  ],
  'F': [
    [1, 1, 1],
    [1],
    [1, 1],
    [1],
    [1]
  ],
  'G': [
    [, 1, 1],
    [1],
    [1, , 1, 1],
    [1, , , 1],
    [, 1, 1]
  ],
  'H': [
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1],
    [1, , 1]
  ],
  'I': [
    [1, 1, 1],
    [, 1],
    [, 1],
    [, 1],
    [1, 1, 1]
  ],
  'J': [
    [1, 1, 1],
    [, , 1],
    [, , 1],
    [1, , 1],
    [1, 1, 1]
  ],
  'K': [
    [1, , , 1],
    [1, , 1],
    [1, 1],
    [1, , 1],
    [1, , , 1]
  ],
  'L': [
    [1],
    [1],
    [1],
    [1],
    [1, 1, 1]
  ],
  'M': [
    [1, 1, 1, 1, 1],
    [1, , 1, , 1],
    [1, , 1, , 1],
    [1, , , , 1],
    [1, , , , 1]
  ],
  'N': [
    [1, , , 1],
    [1, 1, , 1],
    [1, , 1, 1],
    [1, , , 1],
    [1, , , 1]
  ],
  'O': [
    [1, 1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1]
  ],
  'P': [
    [1, 1, 1],
    [1, , 1],
    [1, 1, 1],
    [1],
    [1]
  ],
  'Q': [
    [0, 1, 1],
    [1, , , 1],
    [1, , , 1],
    [1, , 1, 1],
    [1, 1, 1, 1]
  ],
  'R': [
    [1, 1],
    [1, , 1],
    [1, , 1],
    [1, 1],
    [1, , 1]
  ],
  'S': [
    [1, 1, 1],
    [1],
    [1, 1, 1],
    [, , 1],
    [1, 1, 1]
  ],
  'T': [
    [1, 1, 1],
    [, 1],
    [, 1],
    [, 1],
    [, 1]
  ],
  'U': [
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1]
  ],
  'V': [
    [1, , , , 1],
    [1, , , , 1],
    [, 1, , 1],
    [, 1, , 1],
    [, , 1]
  ],
  'W': [
    [1, , , , 1],
    [1, , , , 1],
    [1, , 1, , 1],
    [1, , 1, , 1],
    [1, 1, 1, 1, 1]
  ],
  'X': [
    [1, , , , 1],
    [, 1, , 1],
    [, , 1],
    [, 1, , 1],
    [1, , , , 1]
  ],
  'Y': [
    [1, , 1],
    [1, , 1],
    [, 1],
    [, 1],
    [, 1]
  ],
  'Z': [
    [1, 1, 1, 1, 1],
    [, , , 1],
    [, , 1],
    [, 1],
    [1, 1, 1, 1, 1]
  ],
  ' ': [
    [0],
    [0],
    [0],
    [0],
    [0],
  ],
  '!': [
    [1],
    [1],
    [1],
    [0],
    [1],
  ],
  '?': [
    [,1, 1],
    [1, 0, 0, 1],
    [0, 0, 1, 0,],
    [0, 0, 0,],
    [0, 0, 1],
  ],
  ',': [
    [0],
    [0],
    [0],
    [0],
    [1],
    [1],
  ],
  '.': [
    [0],
    [0],
    [0],
    [0],
    [1],
  ],
  '\'': [
    [1],
    [1],
    [0],
    [0],
    [0],
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

export const fill = (globalX, globalY, width, height, word, context, color = 'black', size = 1) => {
  word = word.toUpperCase();
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