import memoize from 'lodash.memoize';
import uuid from 'uuid/v1';
import handleInteraction from './handleInteraction';
import memoizeReference from './memoizeReference';

const env = process.env.NODE_ENV;
const noop = () => {};

let getGeneralAnalytics = noop;
let userId;

const readUserIdCookie = () => {
  const match = document.cookie.match(/userId=([^;]+)/);
  return match && match[1];
};

/**
 * Allows the analytics reporter to pull any static or generally-relevant information
 * for each entry. (Locale, search parameters, what part of the app the user is looking at, etc.)
 *
 * @param {function}  generalAnalytics    A callback to provide any static information
 *                                        (the app name, language, etc) or general
 *                                        state details (current search parameters,
 *                                        etc). Should return an object.
 */
export const addGeneralAnalytics = (generalAnalytics) => {
  getGeneralAnalytics = () => generalAnalytics();
  const foundId = readUserIdCookie();

  if (foundId) {
    userId = foundId;
  } else {
    userId = uuid();
    document.cookie = `userId=${userId};max-age=86400`;
  }
};

export const reportPageView = (value) => {
  const dataObject = {
    event: 'virtualPageview',
    pageURL: window.location.href,
    pageTitle: value || window.document.title,
  };

  // eslint-disable-next-line no-console
  if (env !== 'test' && env !== 'production') { console.log('Sending Google Analytics report:', dataObject); }

  return window.dataLayer && window.dataLayer.push(dataObject);
};

/**
 * Generates and pushes an analytics report with the given details and any global
 * information provided via addGeneralAnalytics' callback.
 *
 * @param  {string} action      Event type ('click')
 * @param  {string} category    What the user did ('select company')
 * @param  {string} label       Any identifying information ('Trans-Mountain LLC')
 * @param  {any}    value       Objects will be destructured onto the report object
 * @return {{}}                 An object of analytics information
 */

export const reportAnalytics = (category, label, value, action) => {
  if (typeof window.dataLayer === 'undefined') {
    // eslint-disable-next-line no-console
    if (env !== 'test') { console.warn('Google Tag Manager not found.'); }
    // return null;
  }

  const dataObject = {
    ...getGeneralAnalytics(),
    event_category: category,
    event_action: action || 'click',
    event_value: undefined,
    event_label: label,
    event_path: undefined,
    event_userID: readUserIdCookie(),
    event_count: undefined,
    event_doccount: undefined,
    event_hittimestamp: undefined,
    event_hitcount: undefined,
  };

  if (value) {
    if (typeof value === 'object' && value.constructor === Object) {
      Object.entries(value).forEach(([k, v]) => { dataObject[k] = v; });
    } else {
      dataObject.event_value = value;
    }
  }

  // eslint-disable-next-line no-console
  if (env !== 'test' && env !== 'production') { console.log('Sending Google Analytics report:', dataObject); }

  const returnVal = window.dataLayer && window.dataLayer.push(dataObject);

  if (category === 'condition_menu') reportPageView(value);

  return returnVal;
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
  value,
  callback,
  ...boundArgs
) => handleInteraction((e) => {
  reportAnalytics(category, label, value);

  return callback(...boundArgs, e);
}), (category, label, callback, ...boundArgs) => {
  const argIds = boundArgs.map(v => (
    (typeof v === 'function' || typeof v === 'object')
      ? `REF${memoizeReference(v)}`
      : v
  )).join('-');

  return `${memoizeReference(callback)}-${category}-${label}-${argIds}`;
});
