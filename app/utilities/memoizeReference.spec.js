import { expect } from 'chai';
import memoizeReference from './memoizeReference';

const testGenerators = {
  function: () => (() => {}),
  object: () => ({}),
  array: () => ([]),
};

describe('utilities/memoizeReference', () => {
  Object.entries(testGenerators).forEach(([key, generator], i, entries) => {
    describe(key, () => {
      it(`should return the same identifier for the same ${key}`, () => {
        const generated = generator();
        expect(memoizeReference(generated)).to.equal(memoizeReference(generated));
      });

      it(`should return a different identifier for a different ${key}`, () => {
        expect(memoizeReference(generator()))
          .to.not.equal(memoizeReference(generator));
      });

      const inBetweenGenerator = (i === 0) ? entries[1] : entries[i - 1];
      it(`should return the same identifier if a ${inBetweenGenerator[0]} is passed in between`, () => {
        const generated = generator();
        const firstIdentifier = memoizeReference(generated);
        memoizeReference(inBetweenGenerator[1]());
        expect(firstIdentifier).to.equal(memoizeReference(generated));
      });
    });
  });
});
