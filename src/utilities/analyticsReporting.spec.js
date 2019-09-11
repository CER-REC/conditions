import { reportAnalytics, handleAnalyticsInteraction } from './analyticsReporting';

const eventFuncs = { preventDefault: () => {}, stopPropagation: () => {} };

describe('utilities/analyticsReporting', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });
  describe('reportAnalytics', () => {
    test('should push an analytics object with the given details', () => {
      reportAnalytics('click', 'guide', 'expand');
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({ action: 'click', category: 'guide', label: 'expand' });
    });
  });

  describe('handleAnalyticsInteraction', () => {
    test('should return onClick and onKeyPress events', () => {
      const spy = jest.fn();
      const interaction = handleAnalyticsInteraction('select project', 4, spy, 4);

      expect(typeof interaction.onClick).toBe('function');
      interaction.onClick({ ...eventFuncs, type: 'mouseUp' });
      expect(window.dataLayer[0]).toMatchObject({ action: 'mouseUp', category: 'select project', label: 4 });

      expect(typeof interaction.onKeyPress).toBe('function');
      interaction.onKeyPress({ ...eventFuncs, type: 'keyPress', key: 'Enter' });
      expect(window.dataLayer[1]).toMatchObject({ action: 'keyPress', category: 'select project', label: 4 });
    });
  });
});
