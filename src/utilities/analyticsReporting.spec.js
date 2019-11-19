import {
  addGeneralAnalytics,
  reportAnalytics,
  handleAnalyticsInteraction,
} from './analyticsReporting';

const eventFuncs = { preventDefault: () => {}, stopPropagation: () => {} };
const general = { fieldA: 'testing', fieldB: 'more testing' };

const store = {
  state: {},
  getState() { return this.state; },
  setState(newState) { this.state = newState; },
};
addGeneralAnalytics(store.getState.bind(store));

describe('utilities/analyticsReporting', () => {
  beforeEach(() => {
    window.dataLayer = [];
    store.setState({});
  });

  describe('reportAnalytics', () => {
    test('should push an analytics object with any general details', () => {
      store.setState(general);

      reportAnalytics();
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({ fieldA: 'testing', fieldB: 'more testing' });
    });

    test('should push an analytics object with the given details', () => {
      reportAnalytics('drag', 'guide', 'expand');
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({
        action: 'drag',
        category: 'guide',
        label: 'expand',
      });
    });

    test('should push an analytics object with both the given and general details', () => {
      store.setState(general);
      reportAnalytics('click', 'guide', 'expand');
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({
        action: 'click',
        category: 'guide',
        label: 'expand',
        fieldA: 'testing',
        fieldB: 'more testing',
      });
    });
  });

  describe('handleAnalyticsInteraction', () => {
    let spy;
    let interactions;
    beforeEach(() => {
      spy = jest.fn();
      interactions = handleAnalyticsInteraction('select project', 4, spy, 4);
    });

    test('should return onClick and onKeyPress events', () => {
      expect(typeof interactions.onClick).toBe('function');
      expect(typeof interactions.onKeyPress).toBe('function');
    });

    test('onClick should trigger a report', () => {
      interactions.onClick({ ...eventFuncs, type: 'mouseUp' });
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({ action: 'mouseUp', category: 'select project', label: 4 });
    });

    test('onClick should trigger its callback', () => {
      const event = { ...eventFuncs, type: 'mouseUp' };
      interactions.onClick(event);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(4, event);
    });

    test('onKeyPress should trigger a report', () => {
      interactions.onKeyPress({ ...eventFuncs, type: 'keyPress', key: 'Enter' });
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({ action: 'keyPress', category: 'select project', label: 4 });
    });

    test('onKeyPress should trigger its callback', () => {
      const event = { ...eventFuncs, type: 'keyPress', key: 'Enter' };
      interactions.onKeyPress(event);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(4, event);
    });
  });
});
