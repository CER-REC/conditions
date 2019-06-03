import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionConditionSummary from '.';

const themeData = [
  { feature: 'theme', description: 'STANDARD_CONDITION', value: 50 },
  { feature: 'theme', description: 'INTEGRITY_MANAGEMENT', value: 20 },
  { feature: 'theme', description: 'ENVIRONMENTAL_PROTECTION', value: 43 },
  { feature: 'theme', description: 'ADMINISTRATIVE', value: 15 },
  { feature: 'theme', description: 'SUNSET_CLAUSE', value: 5 },
  { feature: 'theme', description: 'ENFORCEMENT', value: 15 },
  { feature: 'theme', description: 'EMERGENCY_MANAGEMENT', value: 3 },
  { feature: 'theme', description: 'SOCIO_ECONOMIC', value: 15 },
  { feature: 'theme', description: 'SAFETY_MANAGEMENT', value: 3 },
  { feature: 'theme', description: 'DAMAGE_PREVENTION', value: 3 },
  { feature: 'theme', description: 'FINANCIAL', value: 3 },
  { feature: 'theme', description: 'SECURITY', value: 3 },
  { feature: 'theme', description: 'MANAGEMENT_SYSTEM', value: 3 },
  { feature: 'theme', description: 'NO_THEME_INDICATED', value: 4 },
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
