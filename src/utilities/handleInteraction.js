import memoize from 'lodash.memoize';
import memoizeReference from './memoizeReference';

export default memoize((callback, ...boundArgs) => {
  // If no callback was passed, return an empty object to allow spreading props
  if (!callback) { return {}; }

  return {
    onClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback(...boundArgs);
    },
    onKeyPress: (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        callback(...boundArgs);
      }
    },
    tabIndex: 0,
    focusable: true,
  };
}, (callback, ...boundArgs) => {
  const argIds = boundArgs
    .map((v) => {
      if (typeof v === 'function' || typeof v === 'object') {
        return `REF${memoizeReference(v)}`;
      }
      return v;
    })
    .join('-');
  return `${memoizeReference(callback)}-${argIds}`;
});
