import memoize from 'lodash.memoize';

// This abuses the fact that memoizing objects uses the reference instead of the
// value, to generate a unique ID for each function reference that is passed.
// As long as a function isn't generated on the fly (in a render), this will
// return the same identifier.
// http://ecma-international.org/ecma-262/7.0/#sec-samevaluenonnumber
let refCount = 0;
export default memoize(() => {
  refCount += 1;
  return refCount;
});
