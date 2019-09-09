let getState;

export const prepareAnalytics = (reduxStore) => { getState = () => reduxStore.getState(); };

/**
 * [description]
 * @param  {[type]} category        [category Constant.getIn(['analytics','category'])]
 * @param  {[type]} action          [action Constant.getIn(['analytics','action'])]
 * @param  {[type]} eventDetail     [plain text for additional detail for example in map piece we
 *                                  can send a name e.g. "NY"]
 * @return {[type]}                 [returns a updated object for analytics]
 */

export const reportAnalytics = (category, action, eventDetail) => {
  if (typeof window.dataLayer === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Google Tag Manager not found.');
    // TODO: Remove this when GTM is added
    // return null;
  }

  /*
    • subVisualization - Which view you're on
    • filter - Search and filter parameters
    • language - en/fr
    • visualization - conditions
    • event - Can't remember exactly what this was
    • action - click, select, unselect, etc
    • category - company, region, condition, instrument, etc (what was clicked)
    • label - Any label associated with whatever was clicked
   */
  const analyticsObject = getState();

  // TODO: Temporary for testing
  console.dir(analyticsObject);

  const dataObject = {
    ...analyticsObject,
    action,
    category,
    label: eventDetail,
  };

  // eslint-disable-next-line no-console
  console.log('Sending Google Analytics report:', dataObject);
  return window.dataLayer.push(dataObject);
};
