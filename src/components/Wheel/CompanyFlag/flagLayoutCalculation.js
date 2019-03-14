// Needed for testing because console.log holds a reference rather than taking
// the object's values immediately when called, giving unreliable output.
console.logObj = obj => console.log(JSON.parse(JSON.stringify(obj)));
console.dirObj = obj => console.dir(JSON.parse(JSON.stringify(obj)));

// Returns the next higher triangular root from x
export const nextTriangularRoot = x => Math.ceil((Math.sqrt(8 * x + 1) - 1) / 2);

// Returns the number of items in a triangle of base n
// export const triangleSize = n => n * (n + 1) / 2;

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

const triangleHasCollision = ({ triangleSize, stemLength, rayIndex, flagData, flagLayouts, flagScale }) => {
  const thirtyDegrees = Math.PI / 6;
  const sixtyDegrees = Math.PI / 3;

  const minimumDistance = 1;
  const horizontalScale = flagScale * 0.3;

  console.log(`Checking collisions for ray ${rayIndex}, triangle size of ${triangleSize}, stem of ${stemLength}`);

  // Flag attaches to stem
  const base = {
    x: rayIndex,
    y: stemLength - triangleSize,
  };

  // Flag tip
  const tip = {
    x: rayIndex - triangleSize * Math.cos(thirtyDegrees) * horizontalScale,
    y: base.y + triangleSize * Math.sin(thirtyDegrees),
  };

  console.log(`base: {x: ${base.x}, y: ${base.y}}`);
  console.log(`tip: {x: ${tip.x}, y: ${tip.y}}`);

  // Check all rays that the flag extends over
  const endIndex = (tip.x - minimumDistance + flagData.length) % flagData.length;

  console.log(`\tendIndex: ${endIndex}`);

  for (let otherIndex = rayIndex - 1; otherIndex >= endIndex; otherIndex -= 1) {
    const wrappedIndex = (otherIndex + flagData.length) % flagData.length;

    // The ray we're looking at
    const other = {
      x: wrappedIndex,
      y: (flagLayouts[wrappedIndex])
        ? flagLayouts[wrappedIndex][0].length
        : flagData[wrappedIndex].length,
    };

    console.log(`\tcomparing to ray ${wrappedIndex}: {x: ${other.x}, y: ${other.y}}`);

    // The ray is tall enough to be worth checking
    if (other.y > base.y) {
      const dx = (other.y - base.y) * Math.tan(sixtyDegrees);
      const xIntersect = base.x - Math.abs(dx);
      const distance = (xIntersect - other.x) * Math.sin(thirtyDegrees);
      console.log(`\t\tdx: ${dx}`);
      console.log(`\t\tcomparing xIntersect: ${xIntersect} <= other.x: ${other.x} || distance: ${distance} < min: ${minimumDistance}`);
      if (xIntersect <= other.x || distance < minimumDistance) {
        return true;
      }
    }
  }

  return false;
};

const buildFlagLayouts = (flagData, maxFlagHeight, flagScale) => {
  const flagLayouts = [];
  const scaledMaxHeight = Math.floor(maxFlagHeight / flagScale);

  // Using a For loop so we can return early if we have a problem
  for (let i = 0, l = flagData.length; i < l; i += 1) {
    const stem = flagData[i].slice(0, scaledMaxHeight);
    const toFold = flagData[i].slice(scaledMaxHeight);

    if (!toFold.length) {
      flagLayouts.push([maskColumn(stem)]);
      continue;
    }

    const triangleSize = findBestTriangle(toFold.length);
    // This flag can't possibly fit in the given space
    // Commented so I can work on the overlapping logic
    // if (base >= stem.length) return null;

    // if (triangleSize >= stem.length) {
    // if (triangleHasCollision({
    if (triangleSize >= stem.length || triangleHasCollision({
      triangleSize,
      stemLength: stem.length,
      rayIndex: i,
      flagData,
      flagLayouts,
      flagScale,
    })) {
      console.log(`folding ray ${i} with a triangle of base ${triangleSize} and stem of ${stem.length} was invalid\n=========================`);
      return false;
    }

    const { columns: frame, remainingDots } = buildTriangleFrame(toFold, triangleSize);

    const layout = (remainingDots.length)
      ? [stem.slice(0, scaledMaxHeight), ...fillTriangleFrame({ columns: frame, dots: remainingDots })]
      : [stem.slice(0, scaledMaxHeight), ...frame];

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
    console.log(`=========================\nattempting to fit the flags at a scale of ${flagScale}`);
    flagLayouts = buildFlagLayouts(flagData, maxFlagHeight, flagScale);

    // Reduce our scale if necessary and try again
  } while (!flagLayouts && ((flagScale -= 0.1) > 0.3));

  console.log(`returning flags with a scale of ${flagScale}`);
  return { flagLayouts, flagScale };
};

export default flagLayoutCalculation;
