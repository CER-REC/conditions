import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import SmallMultiplesLegend from '.';
import LegendItem from './LegendItem';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|SmallMultiplesLegend', () => {
  let spy;
  const noop = () => {};
  let wrapper;

  beforeEach(() => {
    spy = sinon.spy();
    wrapper = shallow((
      <SmallMultiplesLegend
        className="test"
        title="Test Title"
        data={[]}
        onChange={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(SmallMultiplesLegend, () => wrapper);

  describe('when only one data condition is provided', () => {
    const title = 'Title-A';
    const data = [{
      name: 'Condition Title',
      graphData: [{
        date: 2018,
        count: 12,
      }, {
        date: 2019,
        count: 1,
      }, {
        date: 2020,
        count: 345,
      }],
      color: 'black',
    }];

    beforeEach(() => {
      wrapper = shallow((
        <SmallMultiplesLegend
          className="anotherClass"
          title={title}
          data={data}
          onChange={spy}
          selected={data[0].name}
        />
      ));
    });

    it('should not render a "All" list item', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      expect(legendItemsWrapper.filter('[all=true]')).to.have.lengthOf(0);
      expect(legendItemsWrapper).to.have.lengthOf(1);
    });

    it('should call the onChange function on List item change', () => {
      wrapper.find(List).prop('onChange')(0);

      expect(spy.calledOnceWith(data[0].name)).to.equal(true);
    });

    it('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).to.equal(0);
    });
  });

  describe('when multiple data conditions are provided', () => {
    const title = 'ABC-TEST_123';
    const data = [{
      name: 'ConditionTitle 1',
      graphData: [{
        date: 2211,
        count: 7,
      }, {
        date: 2222,
        count: 8,
      }, {
        date: 2233,
        count: 9,
      }],
      color: 'white',
    }, {
      name: 'another title',
      graphData: [{
        date: 2211,
        count: 1515,
      }],
      color: '#123456',
    }, {
      name: 'OTHER_OTHER_TITLE_ABC',
      graphData: [{
        date: 2211,
        count: 0,
      }, {
        date: 2233,
        count: 1,
      }],
      color: 'red',
    }];

    beforeEach(() => {
      wrapper = shallow((
        <SmallMultiplesLegend
          className="something123"
          title={title}
          data={data}
          onChange={spy}
        />
      ));
    });

    it('should render the data as LegendItem components in the List component', () => {
      const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

      for (let i = 0; i < data.length; i += 1) {
        const listItemWrapper = listItemsWrapper.at(i);

        expect(listItemWrapper.type()).to.equal(LegendItem);
        expect(listItemWrapper.prop('title')).to.equal(data[i].name);
        expect(listItemWrapper.prop('data')).to.deep.equal(data[i].graphData);
      }
    });

    it('should pass the same max value to the LegendItem components', () => {
      const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

      for (let i = 0; i < data.length; i += 1) {
        expect(listItemsWrapper.at(i).prop('max')).to.equal(1515);
      }
    });

    it('should render the all LegendItem component', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      expect(legendItemsWrapper.at(0).prop('all')).to.equal(true);
      expect(legendItemsWrapper).to.have.lengthOf(4);
    });

    it('should call the onChange function with null on List item change to the all item', () => {
      // All item is at the top
      wrapper.find(List).prop('onChange')(0);

      expect(spy.calledOnceWith(null)).to.equal(true);
    });

    it('should call the onChange function with the data name on List item change', () => {
      for (let i = 0; i < data.length; i += 1) {
        // Account for all item at the beginning
        wrapper.find(List).prop('onChange')(i + 1);

        expect(spy.calledWith(data[i].name)).to.equal(true);
      }

      expect(spy.callCount).to.equal(data.length);
    });

    it('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).to.equal(0);
    });

    it('should not apply faded to LegendItem components', () => {
      const itemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      itemsWrapper.forEach((itemWrapper) => {
        expect(itemWrapper.prop('faded')).to.be.oneOf([null, false]);
      });
    });

    it('should render the List component with the corresponding item selected when selected is provided', () => {
      wrapper = shallow((
        <SmallMultiplesLegend
          title={title}
          data={data}
          onChange={noop}
          selected={data[2].name}
        />
      ));

      // An "All" item is rendered at the top for multiple data conditions
      expect(wrapper.find(List).prop('selected')).to.equal(3);
    });

    it('should render the List component with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <SmallMultiplesLegend
          title={title}
          data={data}
          onChange={noop}
          selected="N/A"
        />
      ));

      expect(wrapper.find(List).prop('selected')).to.equal(0);
    });

    it('should apply faded to LegendItem components when a highlightName is provided', () => {
      const highlightName = data[2].name;

      wrapper = shallow((
        <SmallMultiplesLegend
          className="abcd"
          title={title}
          data={data}
          onChange={noop}
          highlightName={highlightName}
        />
      ));

      const highlightSelector = `[title="${highlightName}"]`;
      const listWrapper = wrapper.find(List).shallow();
      const fadedItemsWrapper = listWrapper.find(LegendItem).not(highlightSelector);
      const highlightItemWrapper = listWrapper.find(LegendItem).filter(highlightSelector);

      expect(listWrapper.hasClass('faded')).to.equal(true);

      fadedItemsWrapper.forEach((itemWrapper) => {
        expect(itemWrapper.prop('faded')).to.equal(true);
      });

      expect(highlightItemWrapper.prop('faded')).to.equal(false);
    });

    it('should not apply faded to LegendItem components when the highlightName is invalid', () => {
      wrapper = shallow((
        <SmallMultiplesLegend
          className="abcd"
          title={title}
          data={data}
          onChange={noop}
          highlightName="n/a"
        />
      ));

      const listWrapper = wrapper.find(List).shallow();
      const itemsWrapper = listWrapper.find(LegendItem);

      expect(listWrapper.hasClass('faded')).to.equal(false);

      itemsWrapper.forEach((itemWrapper) => {
        expect(itemWrapper.prop('faded')).to.be.oneOf([null, false]);
      });
    });
  });
});
