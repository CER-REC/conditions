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

const buildTriangleFrame = (dots, base) => {
  const remainingDots = [...dots];
  const columns = [];

  for (let i = base; i > 0; i -= 1) {
    const col = new Array(i - 1).fill();
    col.unshift(remainingDots.pop());
    col.push(remainingDots.pop());
    columns.push(col);
  }
  columns.push([remainingDots.pop()]);

  return { columns, remainingDots };
};

const fillTriangleFrame = (dots, columns) => {

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

    const base = nextTriangularRoot(toFold.length);
    const { columns: frame, remainingDots } = buildTriangleFrame(toFold, base);

    // Bypassing the Fill logic until there's actuall Fill logic
    const columns = (false && remainingDots.length)
      ? [ray.slice(0, maxFlagHeight), ...fillTriangleFrame(frame, remainingDots)]
      : [ray.slice(0, maxFlagHeight), ...frame];

    return columns.map(col => maskColumn(col));
  });

  return foldedFlags;
};

export default flagLayoutCalculation;
