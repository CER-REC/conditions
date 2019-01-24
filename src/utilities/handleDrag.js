import memoize from 'lodash.memoize';
import memoizeReference from './memoizeReference';

export default memoize((callback) => {
  let dragging = false;

  return {
    onMouseDown: (e) => {
      e.preventDefault();
      dragging = true;
    },

    onMouseMove: (e) => {
      if (!dragging) { return; }
      callback(e.clientX, e.clientY);
    },

    onMouseUp: (e) => {
      e.preventDefault();
      dragging = false;
    },

    onMouseLeave: (e) => {
      e.preventDefault();
      dragging = false;
    },
  };
}, callback => memoizeReference(callback));
