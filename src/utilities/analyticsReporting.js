import memoize from 'lodash.memoize';
import handleInteraction from './handleInteraction';
import memoizeReference from './memoizeReference';

const noop = () => {};

let getState;
let getAnalyticsFromState = noop;
let silenceConsoleLogs;

/**
 * Allows the analytics reporter to pull information from Redux.
 *
 * @param {{}}        store                 A Redux store.
 * @param {function}  analyticsFromState    A callback to provide any static information
 *                                          (the app name, language, etc) or general
 *                                          state details (current search parameters,
 *                                          etc). Should return an object.
 * @param {boolean}   silenceLogs    Hide console output (i.e. for running tests)
 */
export const connectAnalyticsToStore = (store, analyticsFromState, silenceLogs = false) => {
  getState = () => store.getState();
  getAnalyticsFromState = () => analyticsFromState(getState());
  silenceConsoleLogs = silenceLogs;
};

/**
 * Generates and pushes an analytics report with the given details and any global
 * information provided via prepareAnalytics' analyticsFromState callback.
 *
 * @param  {string} action      Event type ('click')
 * @param  {string} category    What the user did ('select company')
 * @param  {string} label       Any identifying information ('Trans-Mountain LLC')
 * @return {{}}                 An object of analytics information
 */

export const reportAnalytics = (action, category, label = '') => {
  if (typeof window.dataLayer === 'undefined') {
    // eslint-disable-next-line no-console
    if (!silenceConsoleLogs) { console.warn('Google Tag Manager not found.'); }
    // TODO: Uncomment this when GTM is added
    // return null;
  }

  const dataObject = {
    ...getAnalyticsFromState(),
    action,
    category,
    label,
  };

  // eslint-disable-next-line no-console
  if (!silenceConsoleLogs) { console.log('Sending Google Analytics report:', dataObject); }
  // TODO: Remove redundant dataLayer check when GTM is added
  return window.dataLayer && window.dataLayer.push(dataObject);
};

/**
 * Wraps the handleInteraction utility together with reportAnalytics.
 *
 * @param  {string} category    What the user did ('select company')
 * @param  {string} label       Any identifying information ('Trans-Mountain LLC')
 * @param  {function} callback  Will be called upon user interaction with any
 *                              subsequent arguments and, lastly, the React/DOM event.
 * @param  {...*} boundArgs     Arguments to pass to the callback.
 * @return {{}}                 A memoized object with onClick and onKeyPress closures
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
