// Needed for testing because console.log holds a reference rather than taking
// the object's values immediately when called, giving unreliable output.
console.logObj = obj => console.log(JSON.parse(JSON.stringify(obj)));
console.dirObj = obj => console.dir(JSON.parse(JSON.stringify(obj)));

// Returns the next higher triangular root from x
export const nextTriangularRoot = x => Math.ceil((Math.sqrt(8 * x + 1) - 1) / 2);

// Returns the number of items in a triangle of base n
export const triangleSize = n => n * (n + 1) / 2;

const findBestTriangle = n => nextTriangularRoot(n);

const buildTriangleFrame = (dots, base) => {
  const remainingDots = [...dots];
  const columns = [];

  for (let i = base - 1; i > 0; i -= 1) {
    const col = new Array(i - 1).fill(0);

    col.unshift(remainingDots.pop());
    col.push(remainingDots.pop());

    columns.push(col);
  }

  columns.push([remainingDots.pop()]);

  return { columns, remainingDots };
};

const fillTriangleFrame = ({
  dots,
  columns,
  startingColumn = 0,
  endingColumn = (columns.length - 2),
  startingRow = 1,
  rowLengthOffset = 1,
}) => {
  // Fill the lowest-numbered column
  for (
    let row = columns[startingColumn].length - rowLengthOffset - 1;
    row >= startingRow;
    row -= 1
  ) {
    // eslint-disable-next-line no-param-reassign
    columns[startingColumn][row] = dots.pop();
    if (!dots.length) return columns;
  }

  // Fill the rest of the top row
  for (let column = startingColumn + 1; column < endingColumn; column += 1) {
    // eslint-disable-next-line no-param-reassign
    columns[column][startingRow] = dots.pop();
    if (!dots.length) return columns;
  }

  // Fill the rest of the bottom row
  for (let column = endingColumn - 2, end = startingColumn + 1; column >= end; column -= 1) {
    // eslint-disable-next-line no-param-reassign
    columns[column][columns[column].length - rowLengthOffset - 1] = dots.pop();
    if (!dots.length) return columns;
  }

  // The unfilled space is now a smaller triangle, so we can fill it recursively
  return fillTriangleFrame({
    dots,
    columns,
    startingColumn: startingColumn + 1,
    endingColumn: endingColumn - 1,
    startingRow: startingRow + 1,
    rowLengthOffset: rowLengthOffset + 1,
  });
};

const projectToMask = project => (
  (project)
    ? (1 + (project.filtered ? 2 : 0) + (project.relevant ? 4 : 0))
    : 0
);

const maskColumn = column => column.reduce((acc, project) => {
  acc.push(projectToMask(project));
  return acc;
}, []).join('');

const buildFlagLayouts = (flagData, maxHeight) => {
  const flagLayouts = [];

  // Using a For loop so we can return early if we have a problem
  for (let i = 0, l = flagData.length; i < l; i += 1) {
    const stem = flagData[i].slice(0, maxHeight);
    const toFold = flagData[i].slice(maxHeight);

    if (!toFold.length) {
      flagLayouts.push([maskColumn(stem)]);
      continue;
    }

    const base = findBestTriangle(toFold.length);
    if (base >= stem.length) return null;

    const { columns: frame, remainingDots } = buildTriangleFrame(toFold, base);

    const layout = (remainingDots.length)
      ? [stem.slice(0, maxHeight), ...fillTriangleFrame({ columns: frame, dots: remainingDots })]
      : [stem.slice(0, maxHeight), ...frame];

    flagLayouts.push(layout.map(col => maskColumn(col)));
  }

  return flagLayouts;
};

// maxFlagHeight is in dots
const flagLayoutCalculation = (flagData, maxFlagHeight) => {
  let flagScale = 1;

  let flagLayouts;
  // eslint-disable-next-line no-cond-assign
  do {
    flagLayouts = buildFlagLayouts(flagData, Math.floor(maxFlagHeight / flagScale));

    // Reduce our scale if necessary and try again
  } while (!flagLayouts && ((flagScale -= 0.1) > 0.3));

  console.log(`returning flags with a scale of ${flagScale}`);
  return { flagLayouts, flagScale };
};

export default flagLayoutCalculation;
