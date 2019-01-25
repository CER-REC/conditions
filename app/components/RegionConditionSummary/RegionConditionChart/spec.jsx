import React from 'react';
import { shallow } from 'enzyme';
import RegionConditionChart from '.';

const themeData = [
  { color: 'pink', description: 'standardCondition', count: 50 },
  { color: 'red', description: 'integrityManagement', count: 20 },
  { color: 'green', description: 'enviromentalProtect', count: 43 },
  { color: 'blue', description: 'administrative', count: 15 },
  { color: 'purple', description: 'sunsetClause', count: 5 },
  { color: 'yellow', description: 'enforcement', count: 15 },
  { color: 'orange', description: 'emergencyManagement', count: 3 },
  { color: 'navy', description: 'socioEconomic', count: 15 },
  { color: 'plum', description: 'safetyManagement', count: 3 },
  { color: 'olive', description: 'damagePrevention', count: 3 },
  { color: 'coral', description: 'financial', count: 3 },
  { color: 'cadetBlue', description: 'security', count: 3 },
  { color: 'darkGreen', description: 'managementSystem', count: 3 },
  { color: 'black', description: 'noThemeIndicated', count: 4 },
  { color: '#e4e4e4', description: 'all', count: 0 },
];

const typeData = [
  { color: 'pink', description: 'standardCondition', count: 50 },
  { color: 'purple', description: 'nonStandardCondition', count: 100 },
];

describe('Component|RegionConditionSummary/RegionConditionChart', () => {
  describe('with no data', () => {
    const wrapper = shallow(<RegionConditionChart className="" featureData={[]} />);
    test('should return null', () => {
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RegionConditionChart className="" featureData={themeData} />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });
  });
});
