const urlToStateMiddleware = store => next => (action) => {
  // Process the action immediately
  next(action);

  if (action.type === 'urlRouteChanged') {
    console.log(action.payload);
    // const initializeAction = {
    //   type: '',
    //   payload: action.payload,
    // };
    // store.dispatch(initializeAction);
  }
};

export default urlToStateMiddleware;
