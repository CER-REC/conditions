import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionConditionSummary from '.';

const themeData = [
  { feature: 'theme', description: 'STANDARD_CONDITION', count: 50 },
  { feature: 'theme', description: 'INTEGRITY_MANAGEMENT', count: 20 },
  { feature: 'theme', description: 'ENVIRONMENTAL_PROTECTION', count: 43 },
  { feature: 'theme', description: 'ADMINISTRATIVE', count: 15 },
  { feature: 'theme', description: 'SUNSET_CLAUSE', count: 5 },
  { feature: 'theme', description: 'ENFORCEMENT', count: 15 },
  { feature: 'theme', description: 'EMERGENCY_MANAGEMENT', count: 3 },
  { feature: 'theme', description: 'SOCIO_ECONOMIC', count: 15 },
  { feature: 'theme', description: 'SAFETY_MANAGEMENT', count: 3 },
  { feature: 'theme', description: 'DAMAGE_PREVENTION', count: 3 },
  { feature: 'theme', description: 'FINANCIAL', count: 3 },
  { feature: 'theme', description: 'SECURITY', count: 3 },
  { feature: 'theme', description: 'MANAGEMENT_SYSTEM', count: 3 },
  { feature: 'theme', description: 'NO_THEME_INDICATED', count: 4 },
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
