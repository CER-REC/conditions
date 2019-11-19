import { lang, transitionStates } from '../../constants';

const staticDetails = {
  visualization: 'conditions',
  language: lang,
};

const getVisualizationMode = (state) => {
  if (state.transitionState < transitionStates.tutorialStart) { return 'none'; }

  return (state.browseBy === 'company')
    ? 'projects by company'
    : 'conditions by location';
};

export default store => () => {
  const state = store.getState();

  return {
    ...staticDetails,
    visualizationMode: getVisualizationMode(state),
  };
};
