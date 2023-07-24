import { lang, transitionStates } from '../../constants';

const staticDetails = {
  event: 'visualization event',
  event_visualization: 'condition interaction',
  event_language: lang,
};

const getVisualizationMode = (state) => {
  if (state.transitionState < transitionStates.tutorialStart
    || state.transitionState === transitionStates.view1Reset) { return 'none'; }

  return (state.browseBy === 'company')
    ? 'projects by company'
    : 'conditions by location';
};

export default store => () => {
  const state = store.getState();

  return {
    ...staticDetails,
    event_subvisualization: getVisualizationMode(state),
  };
};
