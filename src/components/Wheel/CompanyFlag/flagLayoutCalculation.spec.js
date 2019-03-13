import * as calc from './flagLayoutCalculation';

describe('triangle helpers', () => {
  it('should find triangular roots', () => {
    expect(calc.nextTriangularRoot(1)).toBe(1);
    expect(calc.nextTriangularRoot(2)).toBe(2);
    expect(calc.nextTriangularRoot(3)).toBe(2);
    expect(calc.nextTriangularRoot(4)).toBe(3);
    expect(calc.nextTriangularRoot(8)).toBe(4);
    expect(calc.nextTriangularRoot(11)).toBe(5);
    expect(calc.nextTriangularRoot(16)).toBe(6);
    expect(calc.nextTriangularRoot(22)).toBe(7);
  });

  it('should find the size of a triangle with base n', () => {
    expect(calc.triangleSize(1)).toBe(1);
    expect(calc.triangleSize(2)).toBe(3);
    expect(calc.triangleSize(4)).toBe(10);
    expect(calc.triangleSize(7)).toBe(28);
    expect(calc.triangleSize(15)).toBe(120);
    expect(calc.triangleSize(24)).toBe(300);
  });

  it('should find the minimum number of items to form two sides of a base n triangle', () => {
    expect(calc.triangleMin(1)).toBe(1);
    expect(calc.triangleMin(2)).toBe(3);
    expect(calc.triangleMin(3)).toBe(5);
    expect(calc.triangleMin(4)).toBe(7);
    expect(calc.triangleMin(5)).toBe(9);
    expect(calc.triangleMin(6)).toBe(11);
  });
});
