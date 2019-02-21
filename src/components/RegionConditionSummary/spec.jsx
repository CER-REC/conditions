import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionConditionSummary from '.';

const themeData = [
  { color: 'pink', description: 'STANDARD_CONDITION', count: 50 },
  { color: 'red', description: 'INTEGRITY_MANAGEMENT', count: 20 },
  { color: 'green', description: 'ENVIROMENTAL_PROTECT', count: 43 },
  { color: 'blue', description: 'ADMINISTRATIVE', count: 15 },
  { color: 'purple', description: 'SUNSET_CLAUSE', count: 5 },
  { color: 'yellow', description: 'ENFORCEMENT', count: 15 },
  { color: 'orange', description: 'EMERGENCY_MANAGEMENT', count: 3 },
  { color: 'navy', description: 'SOCIO_ECONOMIC', count: 15 },
  { color: 'plum', description: 'SAFETY_MANAGEMENT', count: 3 },
  { color: 'olive', description: 'DAMAGE_PREVENTION', count: 3 },
  { color: 'coral', description: 'FINANCIAL', count: 3 },
  { color: 'cadetBlue', description: 'SECURITY', count: 3 },
  { color: 'darkGreen', description: 'MANAGEMENT_SYSTEM', count: 3 },
  { color: 'black', description: 'NO_THEME_INDICATED', count: 4 },
  { color: '#e4e4e4', description: 'all', count: 0 },
];

describe('Component|RegionConditionSummary', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RegionConditionSummary featureData={themeData} />);
    });

    shouldBehaveLikeAComponent(RegionConditionSummary, () => wrapper);

    test('should render a formatted message for the title', () => {
      expect(wrapper.find('FormattedMessage')).toHaveLength(1);
    });
  });
});
