const loggerMiddleware = store => next => (action) => {
  const console = { ...window.console };
  const actionType = String(action.type);
  const message = `action ${actionType}`;
  console.log('%c action', 'color: #03A9F4', action);
  console.log('%c action', 'color: #03A9F4', message);
  next(action);
};
export default loggerMiddleware;
