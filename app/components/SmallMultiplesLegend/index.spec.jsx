import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import SmallMultiplesLegend from './';
import LegendItem from './LegendItem';
import List from '../List';

describe('Components|SmallMultiplesLegend', () => {
  let wrapper;
  let spy;
  const noop = () => {};
  const eventFuncs = { preventDefault: noop, stopPropagation: noop };

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

  beforeEach(() => {
    spy = sinon.spy();
  });

  describe('when no data is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<SmallMultiplesLegend title={title} data={[]} onChange={noop} />);
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
      spy = sinon.spy();
      wrapper = mount(<SmallMultiplesLegend title={title} data={data} onChange={spy} />);
    });

    itShouldRenderTitle(title);
    itShouldRenderItems(data, 0);

    it('should not render a "All" list item', () => {
      expect(wrapper.find(List).text()).to.not.contain(wrapper.prop('allLabel'));
      expect(wrapper.find(LegendItem)).to.have.lengthOf(1);
    });

    it('should call the onChange function on click', () => {
      const legendItemWrapper = wrapper.find(LegendItem);

      legendItemWrapper.simulate('click', eventFuncs);
      // eslint-disable-next-line no-unused-expressions
      expect(spy.calledOnceWith(data[0].id)).to.be.true;
    });

    it('should call the onChange function on enter key press', () => {
      const legendItemWrapper = wrapper.find(LegendItem);

      legendItemWrapper.simulate('keypress', {
        key: 'Enter',
        ...eventFuncs,
      });
      // eslint-disable-next-line no-unused-expressions
      expect(spy.calledOnceWith(data[0].id)).to.be.true;
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

    const itShouldCallOnChangeWithNULLOnClick = () => {
      it('should call the onChange function with the data ID on click', () => {
        const allLegendItemWrapper = wrapper.find(LegendItem).filter('[data=null]');

        allLegendItemWrapper.simulate('click', eventFuncs);
        // eslint-disable-next-line no-unused-expressions
        expect(spy.calledOnceWith(null)).to.be.true;
      });
    };

    const itShouldCallOnChangeWithIDOnClick = () => {
      it('should call the onChange function with the data ID on click', () => {
        const legendItemsWrapper = wrapper.find(LegendItem).filter(':not([data=null])');

        for (let i = 0; i < legendItemsWrapper.length; i += 1) {
          const legendItemWrapper = legendItemsWrapper.at(i);

          legendItemWrapper.simulate('click', eventFuncs);
          // eslint-disable-next-line no-unused-expressions
          expect(spy.calledWith(data[i].id)).to.be.true;
        }

        expect(spy.callCount).to.be.equal(data.length);
      });
    };

    const itShouldCallOnChangeWithNULLOnEnter = () => {
      it('should call the onChange function with the data ID on click', () => {
        const allLegendItemWrapper = wrapper.find(LegendItem).filter('[data=null]');

        allLegendItemWrapper.simulate('keypress', {
          key: 'Enter',
          ...eventFuncs,
        });
        // eslint-disable-next-line no-unused-expressions
        expect(spy.calledOnceWith(null)).to.be.true;
      });
    };

    const itShouldCallOnChangeWithIDOnEnter = () => {
      it('should call the onChange function with the data ID on enter key press', () => {
        const legendItemsWrapper = wrapper.find(LegendItem).filter(':not([data=null])');

        for (let i = 0; i < legendItemsWrapper.length; i += 1) {
          const legendItemWrapper = legendItemsWrapper.at(i);

          legendItemWrapper.simulate('keypress', {
            key: 'Enter',
            ...eventFuncs,
          });
          // eslint-disable-next-line no-unused-expressions
          expect(spy.calledWith(data[i].id)).to.be.true;
        }

        expect(spy.callCount).to.be.equal(data.length);
      });
    };

    describe('when no allLabel is provided', () => {
      beforeEach(() => {
        wrapper = mount(<SmallMultiplesLegend title={title} data={data} onChange={spy} />);
      });

      itShouldRenderTitle(title);
      itShouldRenderItems(data, 1);
      itShouldCallOnChangeWithNULLOnClick();
      itShouldCallOnChangeWithIDOnClick();
      itShouldCallOnChangeWithNULLOnEnter();
      itShouldCallOnChangeWithIDOnEnter();

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
        wrapper = mount(<SmallMultiplesLegend title={title} data={data} onChange={spy} allLabel="ALL CONDITIONS AND/OR FEATURES" />);
      });

      itShouldRenderTitle(title);
      itShouldRenderItems(data, 1);
      itShouldCallOnChangeWithNULLOnClick();
      itShouldCallOnChangeWithIDOnClick();
      itShouldCallOnChangeWithNULLOnEnter();
      itShouldCallOnChangeWithIDOnEnter();

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
