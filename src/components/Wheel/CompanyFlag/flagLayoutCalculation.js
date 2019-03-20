const THIRTY_DEGREES = Math.PI / 6;
const SIXTY_DEGREES = Math.PI / 3;

/**
 * Returns the base width of a triangle that would hold N items.
 * A triangle of base T can hold:
 *    N = (T + (T - 1) + (T - 2) + ... + 1)
 * which simplifies to:
 *    N = T * (T + 1) / 2
 * Solving for T gives a quadratic equation:
 *    T = (sqrt(8 * N + 1) - 1) / 2
 * Which we round up to get the next larger triangular integer
 */
export const fitToTriangle = n => Math.ceil((Math.sqrt((8 * n) + 1) - 1) / 2);

/**
 *  Constructs the exterior of the flag
 *
 *  i.e. for a base of 6:
 *
 *             *
 *            * *
 *           * . *
 *          * . . *
 *         * . . . *
 *        * . . . . *
 */
export const buildTriangleFrame = (dots, base) => {
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
/**
 *  Attempts to fill the flag in the order:
 *
 *             *
 *            * *
 *           * 7 *
 *          * 8 6 *
 *         * 9 . 5 *
 *        * 1 2 3 4 *
 *
 *  The remaining space is a smaller triangle, so it recurses until there are
 *  no dots left.
 */
export const fillTriangleFrame = ({
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
  for (
    let column = startingColumn + 1;
    column < endingColumn;
    column += 1
  ) {
    // eslint-disable-next-line no-param-reassign
    columns[column][startingRow] = dots.pop();
    if (!dots.length) return columns;
  }

  // Fill the rest of the bottom row
  for (
    let column = endingColumn - 2, end = startingColumn + 1;
    column >= end;
    column -= 1
  ) {
    // eslint-disable-next-line no-param-reassign
    columns[column][columns[column].length - rowLengthOffset - 1] = dots.pop();
    if (!dots.length) return columns;
  }

  // The unfilled space is now a smaller triangle
  return fillTriangleFrame({
    dots,
    columns,
    startingColumn: startingColumn + 1,
    endingColumn: endingColumn - 2,
    startingRow: startingRow + 1,
    rowLengthOffset: rowLengthOffset + 1,

  });
};

/**
 * Takes the coordinates of a flag's base and another ray's top,
 * both as {x, y}, and determines if the ray intersects a line extending
 * from the base at thirty degrees to horizontal.
 *
 * TODO: Find a way to account for the angle between rays, apply the parent
 * function's horizontal scaling where appropriate to reduce false positives.
 */
export const triangleCollidesWithRay = ({
  flagBase,
  otherRay,
  minimumDistance = 0,
}) => {
  // The ray is tall enough to be worth checking
  if (otherRay.y > flagBase.y) {
    const dx = (otherRay.y - flagBase.y) * Math.tan(SIXTY_DEGREES);
    const xIntersect = flagBase.x - Math.abs(dx);

    const distance = (xIntersect - otherRay.x) * Math.sin(THIRTY_DEGREES);

    if (xIntersect <= otherRay.x || distance < minimumDistance) {
      return true;
    }
  }

  return false;
};

// TODO: Doesn't scale all of the right values with horizontalScale, so it
// finds collisions that should actually be okay. Also doesn't account for the
// slight angle between rays, which leads to more false-positives as well.
const triangleHasCollision = (args) => {
  const {
    triangleSize,
    stemLength,
    rayIndex,
    flagData,
    flagLayouts,
    flagScale,
  } = args;

  // TODO: Magic numbers
  const minimumDistance = flagScale;
  // Account for the flags not being immediately next to each other
  const horizontalScale = flagScale * 0.2;

  const flagBase = {
    x: rayIndex,
    y: stemLength - triangleSize,
  };
  const flagTip = {
    x: rayIndex - triangleSize * Math.cos(THIRTY_DEGREES) * horizontalScale,
    y: flagBase.y + triangleSize * Math.sin(THIRTY_DEGREES),
  };

  // Check all rays that the flag extends over
  const endIndex = (flagTip.x - minimumDistance + flagData.length) % flagData.length;

  for (let otherIndex = rayIndex - 1; otherIndex >= endIndex; otherIndex -= 1) {
    const wrappedIndex = (otherIndex + flagData.length) % flagData.length;

    const otherRay = {
      x: wrappedIndex,
      y: (flagLayouts[wrappedIndex])
        ? flagLayouts[wrappedIndex][0].length
        : flagData[wrappedIndex].length,
    };

    if (triangleCollidesWithRay({
      flagBase,
      otherRay,
      minimumDistance,
    })) return true;
  }

  return false;
};

// Attempts to fold and construct all of the flags
const buildFlagLayouts = (flagData, maxFlagHeight, flagScale) => {
  const flagLayouts = [];
  const scaledMaxHeight = Math.floor(maxFlagHeight / flagScale);

  // Using a For loop rather than Map/ForEach so we can return early if we find a problem
  for (let rayIndex = 0, lastIndex = flagData.length; rayIndex < lastIndex; rayIndex += 1) {
    const stem = flagData[rayIndex].slice(0, scaledMaxHeight);

    if (stem.length === flagData[rayIndex].length) {
      flagLayouts.push([stem]);
    } else {
      const toFold = flagData[rayIndex].slice(scaledMaxHeight);
      const triangleSize = fitToTriangle(toFold.length);

      if (triangleSize >= stem.length
        || triangleHasCollision({
          triangleSize,
          stemLength: stem.length,
          rayIndex,
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
  } while (!flagLayouts && ((flagScale -= 0.1) > 0.3)); // Reduce the scale try again

  return { flagLayouts, flagScale };
};

export default flagLayoutCalculation;
