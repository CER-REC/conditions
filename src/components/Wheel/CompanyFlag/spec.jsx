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
  beforeEach(() => {
    wrapper = shallow(<CompanyFlag
      flagLayout={flagLayoutData}
      height={200}
    />);
  });

  describe('with default props', () => {
    test('should render', () => {
      expect(wrapper.type()).toBe('g');
    });

    test('should have a CompanyFlag class', () => {
      expect(wrapper.is('.CompanyFlag')).toBe(true);
    });

    test('should have a total of 4 flags', () => {
      expect(wrapper.find('ProjectDot')).toHaveLength(20);
    });
  });
});
