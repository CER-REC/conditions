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
      reportAnalytics('guide', undefined, 'expand', 'drag');
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({
        event_category: 'guide',
        event_label: undefined,
        event_value: 'expand',
        event_action: 'drag',
      });
    });
  });

  describe('handleAnalyticsInteraction', () => {
    let spy;
    let interactions;
    beforeEach(() => {
      spy = jest.fn();
      interactions = handleAnalyticsInteraction('select project', undefined, 4, spy, 4);
    });

    test('should return onClick and onKeyPress events', () => {
      expect(typeof interactions.onClick).toBe('function');
      expect(typeof interactions.onKeyPress).toBe('function');
    });

    test('onClick should trigger a report', () => {
      interactions.onClick({ ...eventFuncs, type: 'mouseUp' });
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({ event_category: 'select project', event_value: 4 });
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
      expect(window.dataLayer[0]).toMatchObject({ event_category: 'select project', event_value: 4 });
    });

    test('onKeyPress should trigger its callback', () => {
      const event = { ...eventFuncs, type: 'keyPress', key: 'Enter' };
      interactions.onKeyPress(event);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(4, event);
    });
  });
});
