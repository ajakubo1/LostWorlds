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

export const fill = (globalX, globalY, width, height, word, context, color = 'black', size = 1) => {
  word = word.toUpperCase();
  let needed = [], i;

  for (i = 0; i < word.length; i++) {
    const letter = letters[word.charAt(i)];
    if (letter) {
      needed.push(letter);
    }
  }

  let letterWidth = 0;
  for (i = 0; i < needed.length; i++) {
    let letter = needed[i];
    let currY = 0;
    let addX = 0;
    for (let y = 0; y < letter.length; y++) {
      let row = letter[y];
      addX = Math.max(addX, row.length * size);
      currY += size;
    }
    letterWidth += size + addX;
  }
  let rows;
  let disposition;
  if(letterWidth > width) {
    rows = 3;
    letterWidth = letterWidth / 2;
    disposition = height / 8;
  } else {
    rows = 2;
    disposition = 0
  }

  let globalRow = 0;

  let adjustedHeight = height / (rows - 1);

  let offset = (width - letterWidth) / 2;




  context.fillStyle = color;
  let currX = 0;
  for (i = 0; i < needed.length; i++) {
    let letter = needed[i];
    let currY = 0;
    let addX = 0;
    for (let y = 0; y < letter.length; y++) {
      let row = letter[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          context.fillRect(globalX + offset + currX + x * size, globalY + disposition + (globalRow * adjustedHeight / 2) + (adjustedHeight / 2) - (5 * size / 2) + currY, size, size);
        }
      }
      addX = Math.max(addX, row.length * size);
      currY += size;
    }
    currX += size + addX;

    if(currX > letterWidth && needed[i+1] === letters[' ']) {
      currX = 0;
      globalRow ++;
    }
  }

};