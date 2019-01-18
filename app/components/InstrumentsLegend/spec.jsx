import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import InstrumentsLegend from '.';
import LegendItem from './LegendItem';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|InstrumentsLegend', () => {
  let spy;
  let wrapper;
  const noop = () => {};

  beforeEach(() => {
    spy = sinon.spy();
    wrapper = shallow((
      <InstrumentsLegend
        className="test"
        data={[]}
        onChange={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(InstrumentsLegend, () => wrapper);

  describe('when only one category exists in the data', () => {
    const category = 'category';
    const color = 'red';
    const data = [{
      parentName: 'I.1',
      children: [{
        category,
        color,
      }, {
        category,
        color,
      }],
    }, {
      parentName: 'I.2',
      children: [{
        category,
        color,
      }],
    }];

    beforeEach(() => {
      wrapper = shallow((
        <InstrumentsLegend
          data={data}
          onChange={spy}
          selected={data[0].name}
        />
      ));
    });

    test('should not render a "All" list item', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      expect(legendItemsWrapper.filter('[all=true]')).toHaveLength(0);
      expect(legendItemsWrapper).toHaveLength(1);
    });

    test('should call the onChange function on List item change', () => {
      wrapper.find(List).prop('onChange')(0);

      expect(spy.calledOnceWith(category)).toBe(true);
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });
  });

  describe('when multiple categories exists in the data', () => {
    const categories = ['C1', 'C2', 'C3', 'C4', 'C5'];
    const colors = ['purple', '#A1C1B1', 'blue', '#16AA16', '#00FFFF'];
    const categoryIndicators = [
      [true, true, true, true],
      [true, true, false, false],
      [true, true, false, false],
      [false, true, false, false],
      [false, true, true, false],
    ];
    const data = [{
      parentName: 'oil',
      children: [],
    }, {
      parentName: 'gas',
      children: [],
    }, {
      parentName: 'power',
      children: [],
    }, {
      parentName: 'notSpecified',
      children: [],
    }];

    // Fill in data children elements based on the category indicators
    data.forEach((indicatorsData, typeIndex) => {
      categoryIndicators.forEach((indicators, categoryIndex) => {
        if (indicators[typeIndex]) {
          indicatorsData.children.push({
            category: categories[categoryIndex],
            color: colors[categoryIndex],
          });
        }
      });
    });

    beforeEach(() => {
      wrapper = shallow((
        <InstrumentsLegend
          className="c"
          data={data}
          onChange={spy}
        />
      ));
    });

    test('should render the indicator type headers', () => {
      const headersWrapper = wrapper.find('.headers FormattedMessage');

      data.forEach((indicatorsData, index) => {
        const id = `common.instrument.type.${indicatorsData.parentName}`;

        expect(headersWrapper.at(index).prop('id')).toBe(id);
        expect(headersWrapper.at(index).shallowWithIntl().hasClass('indicator')).toBe(true);
      });
    });

    test(
      'should render the data as LegendItem components in the List component',
      () => {
        for (let i = 0; i < categories.length; i += 1) {
          const listItemWrapper = wrapper.find(List).shallow().find(LegendItem).find(`[title='${categories[i]}']`);

          expect(listItemWrapper).toHaveLength(1);
          expect(listItemWrapper.type()).toBe(LegendItem);
          expect(listItemWrapper.prop('color')).toBe(colors[i]);
          expect(listItemWrapper.prop('indicators')).toEqual(categoryIndicators[i]);
        }
      },
    );

    test('should render the all LegendItem component', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      expect(legendItemsWrapper.at(0).prop('all')).toBe(true);
      expect(legendItemsWrapper).toHaveLength(6);
    });

    test(
      'should call the onChange function with null on List item change to the all item',
      () => {
        // All item is at the top
        wrapper.find(List).prop('onChange')(0);

        expect(spy.calledOnceWith(null)).toBe(true);
      },
    );

    test(
      'should call the onChange function with the categories name on List item change',
      () => {
        for (let i = 0; i < categories.length; i += 1) {
          // Account for all item at the beginning
          wrapper.find(List).prop('onChange')(i + 1);

          expect(spy.calledWith(categories[i])).toBe(true);
        }

        expect(spy.callCount).toBe(categories.length);
      },
    );

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });

    test(
      'should render the List component with the corresponding item selected when selected is provided',
      () => {
        wrapper = shallow((
          <InstrumentsLegend
            data={data}
            onChange={noop}
            selected={categories[2]}
          />
        ));

        // An "All" item is rendered at the top for multiple categories
        expect(wrapper.find(List).prop('selected')).toBe(3);
      },
    );

    test(
      'should render the List component with the first item selected when selected is invalid',
      () => {
        wrapper = shallow((
          <InstrumentsLegend
            data={data}
            onChange={noop}
            selected="?"
          />
        ));

        expect(wrapper.find(List).prop('selected')).toBe(0);
      },
    );
  });
});
