// TODO: Memoize functions to prevent extra renders
export default (callback, ...boundArgs) => {
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
};
