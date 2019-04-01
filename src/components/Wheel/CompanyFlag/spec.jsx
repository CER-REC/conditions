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
        svgHeight={200}
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
        svgHeight={200}
      />);
    });
    test('should have zero project dots', () => {
      expect(wrapper.find('ProjectDot')).toHaveLength(0);
    });
  });

  describe('with one set of dots', () => {
    beforeEach(() => {
      wrapper = shallow(<CompanyFlag
        flagLayout={[
          [
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
          ],
        ]}
        svgHeight={200}
      />);
    });

    test('the flag should not wrap', () => {
      expect(wrapper.find('ProjectDot').first().prop('cx')).toEqual(0);
      expect(wrapper.find('ProjectDot').last().prop('cx')).toEqual(0);
    });
  });

  describe('with multiple sets of dots', () => {
    beforeEach(() => {
      wrapper = shallow(<CompanyFlag
        flagLayout={[
          [
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
          ],
          [
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
          ],
          [
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
            { filtered: false, relevant: true },
          ],
        ]}
        svgHeight={200}
      />);
    });

    test('the first 4 dots should not wrap', () => {
      // 0 - 3 should be zero
      for (let i = 0; i < 4; i += 1) {
        expect(wrapper.find('ProjectDot').at(i).prop('cx')).toEqual(0);
      }
    });

    test('the last 4 dots should be wrapping', () => {
      // 4 - 7 should be a generated number
      for (let i = 4; i < 8; i += 1) {
        expect(wrapper.find('ProjectDot').at(i).prop('cx')).not.toEqual(0);
      }
    });

    test('there should be one stem and 2 flag offsets', () => {
      const secondCX = wrapper.find('ProjectDot').at(4).prop('cx');
      const thirdCX = wrapper.find('ProjectDot').at(8).prop('cx');

      expect(secondCX).not.toEqual(thirdCX);
      expect(secondCX).not.toEqual(0);
      expect(thirdCX).not.toEqual(0);
    });
  });
});