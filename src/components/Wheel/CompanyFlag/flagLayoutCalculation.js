// Returns the next higher triangular root from x
export const nextTriangularRoot = x => Math.ceil((Math.sqrt(8 * x + 1) - 1) / 2);

/**
 *  Constructs the exterior of the flag
 *
 *  i.e. for a base of 4:
 *
 *             *
 *            * *
 *           * . *
 *          * . . *
 */
const buildTriangleFrame = (dots, base) => {
  const remainingDots = [...dots];
  const frame = [];

  for (let i = base - 1; i > 0; i -= 1) {
    const col = new Array(i - 1).fill(0);

    col.unshift(remainingDots.pop());
    col.push(remainingDots.pop());

    frame.push(col);
  }

  frame.push([remainingDots.pop()]);

  return { frame, remainingDots };
};

// TODO: Some of the default params and +/-s in here feel a bit too Magic
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

const triangleHasCollision = ({
  triangleSize,
  stemLength,
  rayIndex,
  flagData,
  flagLayouts,
  flagScale,
}) => {
  const thirtyDegrees = Math.PI / 6;
  const sixtyDegrees = Math.PI / 3;

  // TODO: Magic numbers
  const minimumDistance = 2 * flagScale;
  const horizontalScale = flagScale * 0.2;

  // Flag's base, where it meets the stem
  const base = { x: rayIndex, y: stemLength - triangleSize };

  // Flag's tip
  const tip = {
    x: rayIndex - triangleSize * Math.cos(thirtyDegrees) * horizontalScale,
    y: base.y + triangleSize * Math.sin(thirtyDegrees),
  };

  // Check all rays that the flag extends over
  const endIndex = (tip.x - minimumDistance + flagData.length) % flagData.length;

  for (let otherIndex = rayIndex - 1; otherIndex >= endIndex; otherIndex -= 1) {
    const wrappedIndex = (otherIndex + flagData.length) % flagData.length;

    // The ray we're looking at
    const other = {
      x: wrappedIndex,
      y: (flagLayouts[wrappedIndex])
        ? flagLayouts[wrappedIndex][0].length
        : flagData[wrappedIndex].length,
    };

    // The ray is tall enough to be worth checking
    if (other.y > base.y) {
      const dx = (other.y - base.y) * Math.tan(sixtyDegrees);
      const xIntersect = base.x - Math.abs(dx);
      const distance = (xIntersect - other.x) * Math.sin(thirtyDegrees);
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

  // Using a For loop rather than Map/ForEach so we can return early if we find a problem
  for (let i = 0, l = flagData.length; i < l; i += 1) {
    const stem = flagData[i].slice(0, scaledMaxHeight);

    if (stem.length === flagData[i].length) {
      flagLayouts.push([stem]);
    } else {
      const toFold = flagData[i].slice(scaledMaxHeight);

      const triangleSize = nextTriangularRoot(toFold.length);
      if (triangleSize >= stem.length // The flag would be too large
        || triangleHasCollision({ // The flag would intersect another ray
          triangleSize,
          stemLength: stem.length,
          rayIndex: i,
          flagData,
          flagLayouts,
          flagScale,
        })
      ) {
        return false;
      }

      const { frame, remainingDots } = buildTriangleFrame(toFold, triangleSize);

      const layout = (remainingDots.length)
        ? fillTriangleFrame({ columns: frame, dots: remainingDots })
        : frame;

      layout.unshift(stem);

      flagLayouts.push(layout);
    }
  }

  return flagLayouts;
};

const flagLayoutCalculation = (flagData) => {
  // Maximum stem length (in dots) at the starting scale
  const maxFlagHeight = 20;
  let flagScale = 1;
  let flagLayouts;

  // eslint-disable-next-line no-cond-assign
  do {
    flagLayouts = buildFlagLayouts(flagData, maxFlagHeight, flagScale);

    // Reduce our scale if necessary and try again
  } while (!flagLayouts && ((flagScale -= 0.1) > 0.3));

  return { flagLayouts, flagScale };
};

export default flagLayoutCalculation;
