import { lang, transitionStates } from '../../constants';

const staticDetails = {
  visualization: 'conditions',
  language: lang,
};

const getView = (transitionState) => {
  if (transitionState === transitionStates.view3) { return 'view 3'; }
  if (transitionState === transitionStates.view2) { return 'view 2'; }
  return 'view 1';
};

export default store => () => {
  const state = store.getState();

  const search = { ...state.search };
  delete search.searchResults;
  delete search.filteredProjects;

  return {
    ...staticDetails,
    subVisualization: getView(state.transitionState),
    filter: JSON.stringify(search),
    mode: state.browseBy,
  };
};
