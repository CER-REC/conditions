import memoize from 'lodash.memoize';
import { lang, transitionStates } from '../constants';
import handleInteraction from './handleInteraction';
import memoizeReference from './memoizeReference';

const staticDetails = {
  visualization: 'conditions',
  language: lang,
};

let getState;
let silenceLogs;
export const prepareAnalytics = (reduxStore, silenceConsoleLogs) => {
  getState = () => reduxStore.getState();
  silenceLogs = silenceConsoleLogs;
};

const getView = (transitionState) => {
  if (transitionState === transitionStates.view3) { return 'view 3'; }
  if (transitionState === transitionStates.view2) { return 'view 2'; }
  return 'view 1';
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

/**
 * [description]
 * @param  {[type]} action      Event type ('click')
 * @param  {[type]} category    What the user interacted with ('wheel list')
 * @param  {[type]} label       Any identifying information ('Trans-Mountain LLC')
 * @return {[type]}             returns an updated object for analytics
 */

export const reportAnalytics = (action, category, label = '') => {
  if (typeof window.dataLayer === 'undefined') {
    // eslint-disable-next-line no-console
    if (!silenceLogs) { console.warn('Google Tag Manager not found.'); }
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
  if (!silenceLogs) { console.log('Sending Google Analytics report:', dataObject); }
  // TODO: Enable this when GTM is added
  // return window.dataLayer.push(dataObject);
};

/**
 * Usage is pretty much the same as handleInteraction, with two additional fields
 * in front for the event category and label (see descriptions above)
 *
 * Example:
 * <div
 *   {...handleAnalyticsInteraction('browseBy', `to ${props.mode}`, props.onClick, props.mode)}
 * />
 */
export const handleAnalyticsInteraction = memoize((
  category,
  label,
  callback,
  ...boundArgs
) => handleInteraction((e) => {
  reportAnalytics(e.type, category, label);

  return callback(...boundArgs, e);
}), (category, label, callback, ...boundArgs) => {
  const argIds = boundArgs.map(v => (
    (typeof v === 'function' || typeof v === 'object')
      ? `REF${memoizeReference(v)}`
      : v
  )).join('-');

  return `${memoizeReference(callback)}-${category}-${label}-${argIds}`;
});
