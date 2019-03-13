// Needed for testing because console.log holds a reference rather than taking
// the object's values when called.
console.logObj = obj => console.log(JSON.parse(JSON.stringify(obj)));
console.dirObj = obj => console.dir(JSON.parse(JSON.stringify(obj)));

// Returns the next higher triangular root from x
export const nextTriangularRoot = x => Math.ceil((Math.sqrt(8 * x + 1) - 1) / 2);

// Returns the number of items in a triangle of base n
export const triangleSize = n => n * (n + 1) / 2;

/*
 * Returns the minimum number of items required to form two sides of a triangle with base n
 * (The flag's stem closes off the third side)
 *
 * n = 4:
 *
 *             *
 *            * *
 *           *   *
 *          *     *
 * . . . . . . . . .
 *
 * min = 7
 */
export const triangleMin = n => 2 * n - 1;

const findAcceptableTriangleSize = n => nextTriangularRoot(n);

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
  console.dirObj(columns);
  // Fill the lowest-numbered column
  for (let row = columns[startingColumn].length - rowLengthOffset - 1; row >= startingRow; row -= 1) {
    // eslint-disable-next-line no-param-reassign
    console.log(`\tfilling column ${startingColumn}, row ${row}`);
    columns[startingColumn][row] = dots.pop();
    if (!dots.length) return columns;
  }

  // console.log(`after filling the first column (${dots.length} dots left}):`);
  console.dirObj(columns);

  // Fill the rest of the top row
  for (let column = startingColumn + 1; column < endingColumn; column += 1) {
    console.log(`\tfilling column ${column}, row ${startingRow}`);
    // eslint-disable-next-line no-param-reassign
    columns[column][startingRow] = dots.pop();
    if (!dots.length) return columns;
  }

  // console.log(`after filling the top row (${dots.length} dots left}):`);
  console.dirObj(columns);

  // Fill the rest of the bottom row
  for (let column = endingColumn - 2, end = startingColumn + 1; column >= end; column -= 1) {
    console.log(`\tfilling column ${column}, row ${columns[column].length - rowLengthOffset - 1}`);
    // eslint-disable-next-line no-param-reassign
    columns[column][columns[column].length - rowLengthOffset - 1] = dots.pop();
    if (!dots.length) return columns;
  }

  // console.log(`after filling the bottom row (${dots.length} dots left}):`);
  console.dirObj(columns);

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

// maxFlagHeight is in dots
const flagLayoutCalculation = (flagData, maxFlagHeight) => {
  const foldedFlags = flagData.map((ray, rayIndex) => {
    const toFold = ray.slice(maxFlagHeight);

    if (!toFold.length) {
      const flag = ray.slice(0, maxFlagHeight).reduce((acc, cur) => {
        acc.push(projectToMask(cur));
        return acc;
      }, []).join('');

      return [flag];
    }

    console.log(`-------------------------\nFolding ray ${rayIndex}`);
    console.log(`Ray has ${ray.length} dots; ${toFold.length} are foldable`);

    const base = findAcceptableTriangleSize(toFold.length);

    console.log(`A triangle of base ${base} can fit them (max. ${base * (base + 1) / 2})`);
    const { columns: frame, remainingDots } = buildTriangleFrame(toFold, base);

    console.log(`The outer frame used ${toFold.length - remainingDots.length} dots, there are ${remainingDots.length} left`);
    console.dirObj(frame);

    // Bypassing the Fill logic until there's actuall Fill logic
    const columns = (remainingDots.length)
      ? [ray.slice(0, maxFlagHeight), ...fillTriangleFrame({ columns: frame, dots: remainingDots })]
      : [ray.slice(0, maxFlagHeight), ...frame];

    console.log(`Done folding ray ${rayIndex}`)
    console.dirObj(columns);

    return columns.map(col => maskColumn(col));
  });

  console.dirObj(foldedFlags);

  return foldedFlags;
};

export default flagLayoutCalculation;
