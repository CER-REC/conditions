import memoizeReference from './memoizeReference';

const testGenerators = {
  function: () => (() => {}),
  object: () => ({}),
  array: () => ([]),
};

describe('utilities/memoizeReference', () => {
  Object.entries(testGenerators).forEach(([key, generator], i, entries) => {
    describe(key, () => {
      test(`should return the same identifier for the same ${key}`, () => {
        const generated = generator();
        expect(memoizeReference(generated)).toBe(memoizeReference(generated));
      });

      test(`should return a different identifier for a different ${key}`, () => {
        expect(memoizeReference(generator())).not.toBe(memoizeReference(generator));
      });

      const inBetweenGenerator = (i === 0) ? entries[1] : entries[i - 1];
      test(`should return the same identifier if a ${inBetweenGenerator[0]} is passed in between`, () => {
        const generated = generator();
        const firstIdentifier = memoizeReference(generated);
        memoizeReference(inBetweenGenerator[1]());
        expect(firstIdentifier).toBe(memoizeReference(generated));
      });
    });
  });
});
