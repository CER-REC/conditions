import { fitToTriangle, buildTriangleFrame, fillTriangleFrame } from './flagLayoutCalculation';

const newArr = n => new Array(n).fill(1);

describe('flagLayoutCalculation', () => {
  it('should correctly fit values in a triangle', () => {
    expect(fitToTriangle(3)).toBe(2);
    expect(fitToTriangle(7)).toBe(4);
    expect(fitToTriangle(12)).toBe(5);
    expect(fitToTriangle(15)).toBe(5);
    expect(fitToTriangle(17)).toBe(6);
    expect(fitToTriangle(35)).toBe(8);
  });

  it('should correctly build triangle frames', () => {
    expect(buildTriangleFrame(newArr(1), 1)).toEqual({
      frame: [[1]],
      remainingDots: [],
    });

    expect(buildTriangleFrame(newArr(3), 2)).toEqual({
      frame: [
        [1, 1],
        [1],
      ],
      remainingDots: [],
    });

    expect(buildTriangleFrame(newArr(9), 4)).toEqual({
      frame: [
        [1, 0, 0, 1],
        [1, 0, 1],
        [1, 1],
        [1],
      ],
      remainingDots: [1, 1],
    });

    expect(buildTriangleFrame(newArr(12), 6)).toEqual({
      frame: [
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 1],
        [1, 1],
        [1],
      ],
      remainingDots: [1],
    });
  });

  it('should correct fill triangle frames', () => {
    expect(fillTriangleFrame({
      columns: [
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 1],
        [1, 1],
        [1],
      ],
      dots: newArr(6),
    })).toEqual([
      [1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 1],
      [1, 0, 1],
      [1, 1],
      [1],
    ]);

    expect(fillTriangleFrame({
      columns: [
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 1],
        [1, 1],
        [1],
      ],
      dots: newArr(12),
    })).toEqual([
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1],
      [1, 1],
      [1],
    ]);

    expect(fillTriangleFrame({
      columns: [
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 1],
        [1, 1],
        [1],
      ],
      dots: newArr(15),
    })).toEqual([
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1],
      [1, 1],
      [1],
    ]);

    expect(fillTriangleFrame({
      columns: [
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 1],
        [1, 1],
        [1],
      ],
      dots: newArr(20),
    })).toEqual([
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1],
      [1, 1],
      [1],
    ]);
  });
});
