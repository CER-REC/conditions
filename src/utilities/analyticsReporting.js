import { lang, transitionStates } from '../constants';
import handleInteraction from './handleInteraction';

const staticDetails = {
  visualization: 'conditions',
  language: lang,
};

let getState;

const getView = (transitionState) => {
  if (transitionState <= transitionStates.tutorialStart) { return 'view 1'; }
  if (transitionState === transitionStates.view2) { return 'view 2'; }
  return 'view 3';
};
const analyticsFromState = () => {
  const state = getState();

  const search = { ...state.search };
  delete search.searchResults;
  delete search.filteredProjects;

  return {
    subVisualization: getView(state.transitionState),
    filter: JSON.stringify(search),
    mode: state.browseBy,
  };
};

export const prepareAnalytics = (reduxStore) => { getState = () => reduxStore.getState(); };

/**
 * [description]
 * @param  {[type]} action      Event type ('click')
 * @param  {[type]} category    What the user interacted with ('wheel list')
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
  // TODO: Enable this when GTM is added
  // return window.dataLayer.push(dataObject);
};

export const handleAnalyticsInteraction = (
  category,
  label,
  callback,
  ...boundArgs
) => handleInteraction((e) => {
  reportAnalytics(e.type, category, label);
  return callback(...boundArgs, e);
});
