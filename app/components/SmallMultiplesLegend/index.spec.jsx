import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import SmallMultiplesLegend from './';
import LegendItem from './LegendItem';
import List from '../List';

describe('Components|SmallMultiplesLegend', () => {
  let wrapper;

  const itShouldRenderTitle = (title) => {
    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });
  };

  const itShouldRenderItems = (data, startIndex) => {
    it('should render the data as LegendItem components in the List component', () => {
      const listItems = wrapper.find(List).prop('items');

      for (let i = 0; i < data.length; i += 1) {
        const listIndex = startIndex + i;

        expect(listItems[listIndex].type).to.be.equal(LegendItem);
        expect(listItems[listIndex].props.title).to.equal(data[i].id);
        expect(listItems[listIndex].props.data).to.deep.equal(data[i].conditions);
      }
    });
  };

  describe('when no data is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<SmallMultiplesLegend title={title} />);
    });

    itShouldRenderTitle(title);

    it('should not render a list', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.find(List)).to.be.empty;
    });
  });

  describe('when only one data condition is provided', () => {
    const title = 'Title-A';
    const data = [{
      id: 'Condition Title',
      conditions: [{
        date: new Date('2018-01-01T00:00:00.000Z'),
        number: 12,
      }, {
        date: new Date('2018-01-02T00:00:00.000Z'),
        number: 1,
      }, {
        date: new Date('2018-01-03T00:00:00.000Z'),
        number: 345,
      }],
    }];

    beforeEach(() => {
      wrapper = mount(<SmallMultiplesLegend title={title} data={data} />);
    });

    itShouldRenderTitle(title);
    itShouldRenderItems(data, 0);

    it('should not render a "All" list item', () => {
      expect(wrapper.find(List).text()).to.not.contain(wrapper.prop('allLabel'));
      expect(wrapper.find(LegendItem)).to.have.lengthOf(1);
    });
  });

  describe('when multiple data conditions are provided', () => {
    const title = 'ABC-TEST_123';
    const data = [{
      id: 'ConditionTitle 1',
      conditions: [{
        date: new Date('2222-01-01T00:00:00.000Z'),
        number: 7,
      }, {
        date: new Date('2222-02-01T00:00:00.000Z'),
        number: 8,
      }, {
        date: new Date('2222-03-01T00:00:00.000Z'),
        number: 9,
      }],
    }, {
      id: 'another title',
      conditions: [{
        date: new Date('2222-01-01T00:00:00.000Z'),
        number: 1515,
      }],
    }, {
      id: 'OTHER_OTHER_TITLE_ABC',
      conditions: [{
        date: new Date('2222-02-02T00:00:00.000Z'),
        number: 0,
      }, {
        date: new Date('2222-02-22T00:00:00.000Z'),
        number: 1,
      }],
    }];

    describe('when no allLabel is provided', () => {
      beforeEach(() => {
        wrapper = mount(<SmallMultiplesLegend title={title} data={data} />);
      });

      itShouldRenderTitle(title);
      itShouldRenderItems(data, 1);

      it('should render the default allLabel as a LegendItem component', () => {
        const firstListItem = wrapper.find(List).prop('items')[0];

        expect(firstListItem.type).to.be.equal(LegendItem);
        expect(firstListItem.props.title).to.equal(SmallMultiplesLegend.defaultProps.allLabel);
        // eslint-disable-next-line no-unused-expressions
        expect(firstListItem.props.data).to.be.null;
        expect(wrapper.find(LegendItem)).to.have.lengthOf(4);
      });
    });

    describe('when a allLabel is provided', () => {
      beforeEach(() => {
        wrapper = mount(<SmallMultiplesLegend title={title} data={data} allLabel="ALL CONDITIONS AND/OR FEATURES" />);
      });

      itShouldRenderTitle(title);
      itShouldRenderItems(data, 1);

      it('should render the provided allLabel as a LegendItem component', () => {
        const firstListItem = wrapper.find(List).prop('items')[0];

        expect(firstListItem.type).to.be.equal(LegendItem);
        expect(firstListItem.props.title).to.equal(wrapper.prop('allLabel'));
        // eslint-disable-next-line no-unused-expressions
        expect(firstListItem.props.data).to.be.null;
        expect(wrapper.find(LegendItem)).to.have.lengthOf(4);
      });
    });
  });
});
