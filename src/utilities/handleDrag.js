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

    // TODO: This doesn't work since we want to handle leaving the parent el
    /*
    onMouseOut: (e) => {
      e.preventDefault();
      dragging = false;
    },
    */
  };
}, callback => memoizeReference(callback));
