import { lang, transitionStates } from '../constants';

const staticDetails = {
  visualization: 'conditions',
  language: lang,
};

let getState;
export const prepareAnalytics = (reduxStore) => { getState = () => reduxStore.getState(); };

const getView = (transitionState) => {
  if (transitionState <= transitionStates.tutorialStart) { return 'view 1'; }
  if (transitionState === transitionStates.view2) { return 'view 2'; }
  return 'view 3';
};
const analyticsFromState = () => {
  /*
    • subVisualization - Which view you're on
    • filter - Search and filter parameters
   */
  const state = getState();

  const search = { ...state.search };
  delete search.searchResults;
  delete search.filteredProjects;

  return {
    subVisualization: getView(state.transitionState),
    filter: JSON.stringify(state.search),
    mode: state.browseBy,
  };
};

/**
 * [description]
 * @param  {[type]} action      What the user did ('clicked')
 * @param  {[type]} category    What the user did it to ('wheel list')
 * @param  {[type]} label       Any identifying information ('Trans-Mountain LLC')
 * @return {[type]}             returns an updated object for analytics
 */

export const reportAnalytics = (action, category, label) => {
  if (typeof window.dataLayer === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Google Tag Manager not found.');
    // TODO: Remove this when GTM is added
    // return null;
  }

  const dataObject = {
    ...staticDetails,
    ...analyticsFromState(),
    action,
    category,
    label,
  };

  // eslint-disable-next-line no-console
  console.log('Sending Google Analytics report:', dataObject);
  return window.dataLayer.push(dataObject);
};
