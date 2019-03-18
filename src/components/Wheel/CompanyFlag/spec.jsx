import React from 'react';
import { shallow } from 'enzyme';

import CompanyFlag from '.';

describe('Components|Wheel/CompanyFlag', () => {
  const flagLayoutData = [
    [{ filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
    ],
    [{ filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
      0,
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
    ],
    [{ filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
      { filtered: false, relevant: false },
      0,
      { filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
    ],
    [{ filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
    ],
  ];

  let wrapper;

  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(<CompanyFlag
        flagLayout={flagLayoutData}
        height={200}
      />);
    });
    test('should render', () => {
      expect(wrapper.type()).toBe('g');
    });

    test('should have a CompanyFlag class', () => {
      expect(wrapper.is('.CompanyFlag')).toBe(true);
    });

    test('should have a total of 20 Dots', () => {
      expect(wrapper.find('ProjectDot')).toHaveLength(20);
    });
  });

  describe('with all 0 values', () => {
    beforeEach(() => {
      wrapper = shallow(<CompanyFlag
        flagLayout={[[0, 0, 0, 0], [0, 0, 0, 0]]}
        height={200}
      />);
    });
    test('should have zero project dots', () => {
      expect(wrapper.find('ProjectDot')).toHaveLength(0);
    });
  });
});
